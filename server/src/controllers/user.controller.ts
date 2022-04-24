import { Request, Response } from 'express';
import { getCustomRepository, getManager, getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '@src/entities/user/user.entity';
import { UserRepository } from '@src/repositorys/user.repository';
import logger from '@src/helpers/winston.helper';
import { sendAuthEmail, sendFindEmail } from '@src/helpers/nodemailer.helper';
import { SignUpInput, ForgotPwInput, VerifyUserInput, ResetPwInput } from '@src/schemas/user.schema';
import ApiError from '@src/errors/api.error';

export const signUp = async (req: Request<{}, {}, SignUpInput['body']>, res: Response): Promise<any> => {
  const { email, nickname, pw } = req.body;

  // 기존 이메일 존재 유무를 확인합니다.
  const existingEmail = await getRepository(User).findOne({ email });
  if (existingEmail) {
    logger.warn('이미 존재하는 이메일로 회원가입을 시도합니다.');
    throw ApiError.Conflict('이미 존재하는 이메일 입니다.');
  }

  // 기존 닉네임 존재 유무를 확인합니다.
  const existingNickname = await getRepository(User).findOne({ nickname });
  if (existingNickname) {
    logger.warn('이미 존재하는 닉네임으로 회원가입을 시도합니다.');
    throw ApiError.Conflict('이미 존재하는 닉네임 입니다.');
  }

  // 비밀번호를 암호화 합니다.
  const encryptedPw = await bcrypt.hash(pw, 8);
  const emailToken = await bcrypt.hash(email, 8);
  const pwToken = await bcrypt.hash(nickname, 8);

  // 유저 테이블에 정보를 저장합니다.
  const user = getRepository(User).create({ email, nickname, pw: encryptedPw, emailToken, pwToken });
  await getRepository(User).save(user);

  // 인증이메일을 발송합니다.
  await sendAuthEmail(req, res, email, emailToken);

  /*
   * 클라이언트에 엑세스토큰를 쿠키로 보냅니다. (만료기한 7일)
   * 클라이언트에게 새로 생성된 유저정보를 보내 줍니다.
   */
  logger.info('회원가입 되었습니다.');
  return res.status(201).json({ ok: true, message: '회원가입 되었습니다.' });
};

export const verifyUser = async (req: Request<{}, VerifyUserInput['query'], {}>, res: Response): Promise<any> => {
  const { emailToken } = req.query;

  const user = await getRepository(User).findOne({ emailToken: emailToken as string });
  if (!user) {
    logger.warn('존재하지 않는 이메일로 인증을 시도하고 있습니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }

  //  auth 테이블에 emailToken과 isVerified 정보를 수정해서 이메일 인증을 완료합니다.
  // 로그인이 가능한 계정입니다.
  const decryptedEmailToken = await bcrypt.compare(user?.email!, emailToken as string);
  if (decryptedEmailToken) {
    user!.emailToken = null;
    user!.isVerified = true;
    await getRepository(User).save(user!);
  }

  // 로그인을 위해 클라이언트의 홈페이지로 리다이렉트 합니다.
  logger.info('이메일 인증확인 성공하였습니다.');
  return res.status(200).redirect(process.env.CLIENT_ADDR as string);
};

export const forgotPw = async (req: Request<{}, {}, ForgotPwInput['body']>, res: Response): Promise<any> => {
  const userRepo = getCustomRepository(UserRepository);

  const { email } = req.body;

  // 요청받은 email로 유저의 pwToken을 찾습니다.
  const user = await userRepo.selectPwTokenByEmail(email);
  if (!user) {
    logger.warn('존재하지 않는 이메일로 비밀번호 찾기를 시도하고 있습니다.');
    throw ApiError.NotFound('이메일이 존재하지 않습니다.');
  }

  // 유저가 존재한다면 비밀번호 찾기 인증 메일을 발송합니다.
  // 비밀번호 인증을 위해 auth테이블에 pwToken이 필요합니다.
  await sendFindEmail(req, res, email, user.pwToken);

  return res.status(200).json({ ok: true, message: '인증 이메일을 발송하였습니다.' });
};

export const resetPw = async (
  req: Request<{}, ResetPwInput['query'], ResetPwInput['body']>,
  res: Response
): Promise<any> => {
  const userRepo = getCustomRepository(UserRepository);
  const { pw } = req.body;
  const { pwToken } = req.query;

  const user = await getRepository(User).findOne({ pwToken: pwToken as string });
  if (!user) {
    logger.warn('잘못된 비밀번호 토큰으로 유저찾기를 시도하고 있습니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }

  // 클라이언트에서 받아온 비밀번호를 헤싱하여 데이터베이스에 저장 합니다.
  // 보안을 위해 pwToken을 새롭게 발급하고 데이터베이스에 저장합니다.
  const encryptedPw = await bcrypt.hash(pw, 8);
  const newPwToken = await bcrypt.hash(user?.nickname as string, 8);

  // 새로운 비밀번호 토큰과 비밀번호를 업데이트 합니다.
  // 하나의 쿼리로 2개의 칼럼을 바꿀 수 있다.
  await userRepo.updatePwAndPwToken(user.id, encryptedPw, newPwToken);

  logger.info('비밀번호가 재설정 되었습니다.');
  return res.status(200).json({ ok: true, message: '비밀번호가 재설정 되었습니다.' });
};
