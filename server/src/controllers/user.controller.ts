import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '@src/entities/user/user.entity';
import { Drawing } from '@src/entities/drawing/drawing.entity';
import { ImageKey } from '@src/entities/board/imageKey.entity';
import { UserRepository } from '@src/repositorys/user.repository';
import logger from '@src/helpers/winston.helper';
import { sendAuthEmail, sendFindEmail, sendChangeEmail } from '@src/helpers/nodemailer.helper';
import ApiError from '@src/errors/api.error';
import { s3Delete } from '@src/utils/s3.utils';
import cluster from '@src/helpers/redis.helper';
import {
  SignUpInput,
  ForgotPwInput,
  VerifyUserInput,
  ResetPwInput,
  updateEmailInput,
  verifyEmailInput,
  updateNicknameInput,
  updatePwInput,
  updateDescInput,
  updateAvatarInput,
  updateDefaultAvatarInput,
  updateCoverInput,
  updateDefaultCoverInput,
  deleteAccountInput,
  GetUserInput,
} from '@src/schemas/user.schema';

export const signUp = async (req: Request<{}, {}, SignUpInput['body']>, res: Response): Promise<any> => {
  const { email, nickname, pw } = req.body;

  // 기존 이메일 존재 유무를 확인합니다.
  const isExistingEmail = await getRepository(User).count({ email });
  if (!isExistingEmail) {
    logger.warn('이미 존재하는 이메일로 회원가입을 시도합니다.');
    throw ApiError.Conflict('이미 존재하는 이메일 입니다.');
  }

  // 기존 닉네임 존재 유무를 확인합니다.
  const isExistingNickname = await getRepository(User).count({ nickname });
  if (!isExistingNickname) {
    logger.warn('이미 존재하는 닉네임으로 회원가입을 시도합니다.');
    throw ApiError.Conflict('이미 존재하는 닉네임 입니다.');
  }

  // 비밀번호를 암호화 합니다.
  const encryptedPw = await bcrypt.hash(pw, 8);
  const emailToken = await bcrypt.hash(email, 8);
  const pwToken = await bcrypt.hash(nickname, 8);

  // 유저 테이블에 정보를 저장합니다.
  const newUser = getRepository(User).create({ email, nickname, pw: encryptedPw, emailToken, pwToken });
  await getRepository(User).save(newUser);

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
  // pw칼럼은 select: false 처리가 되어있기 때문에 쿼리빌더 addSelect를 이용해서 불러온다.
  const user = await userRepo.findWithPwTokenByEmail(email);
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

export const getUser = async (req: Request<GetUserInput['params'], {}, {}>, res: Response): Promise<any> => {
  const { id } = req.params;

  const user = await getRepository(User).findOne({ id: Number(id) });
  if (!user) {
    logger.warn('존재하지 않는 유저가 유저정보를 가져오려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }

  logger.info('유저정보를 가져왔습니다.');
  return res.status(200).json({ ok: true, message: '유저정보를 가져왔습니다.', user });
};

export const verifyEmail = async (
  req: Request<verifyEmailInput['params'], {}, verifyEmailInput['body']>,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { newEmail } = req.body;

  const isExistingUser = await getRepository(User).count({ id: Number(id) });
  if (!isExistingUser) {
    logger.warn('존재하지 않은 유저가 이메일 변경을 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }
  const isExistingEmail = await getRepository(User).findOne({ email: newEmail });
  if (!isExistingEmail) {
    logger.warn('이미 존재하는 이메일로 이메일 변경을 시도하고 있습니다.');
    throw ApiError.Conflict('이미 존재하는 이메일 입니다.');
  }

  await sendChangeEmail(req, res, Number(id), newEmail);

  logger.info('이메일 변경 인증 메세지를 보냈습니다.');
  return res.status(200).json({ ok: true, message: '이메일 변경을 위한 인증 메세지를 보냈습니다.' });
};

export const updateEmail = async (
  req: Request<updateEmailInput['params'], updateEmailInput['query'], {}>,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { newEmail } = req.query;

  // 이메일을 변경해줍니다.
  await getRepository(User).update(Number(id), { email: newEmail as string });

  logger.info(`${id}님 이메일 변경 완료되었습니다.`);
  return res.status(200).redirect(process.env.CLIENT_ADDR as string);
};

export const updateNickname = async (
  req: Request<updateNicknameInput['params'], {}, updateNicknameInput['body']>,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { newNickname } = req.body;

  const isExistingUser = await getRepository(User).count({ id: Number(id) });
  if (!isExistingUser) {
    logger.warn('존재하지 않은 유저가 닉네임 변경을 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }
  const isExistingNickname = await getRepository(User).findOne({ nickname: newNickname });
  if (!isExistingNickname) {
    logger.warn('이미 존재하는 닉네임으로 닉네임 변경을 시도하고 있습니다.');
    throw ApiError.Conflict('이미 존재하는 닉네임 입니다.');
  }

  // 닉네임을 변경해줍니다.
  await getRepository(User).update(Number(id), { nickname: newNickname as string });

  logger.info(`${id}님의 닉네임 변경이 완료되었습니다.`);
  return res.status(200).json({ ok: true, message: '닉네임 변경 완료되었습니다.', newNickname });
};

export const updatePw = async (
  req: Request<updatePwInput['params'], {}, updatePwInput['body']>,
  res: Response
): Promise<any> => {
  const userRepo = getCustomRepository(UserRepository);

  const { id } = req.params;
  const { currentPw, newPw } = req.body;

  // select: false 처리된 pw를 가져오기위해 쿼리빌더를 addSelect를 사용한다.
  const user = await userRepo.findWithPwByEmail(id);
  if (!user) {
    logger.warn('존재하지 않은 유저가 닉네임 변경을 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }

  const decryptedPw = await bcrypt.compare(currentPw, user?.pw as string);
  if (!decryptedPw) {
    logger.warn('일치하지 않는 비밀번호로 비밀번호 변경을 시도하고 있습니다.');
    throw ApiError.BadRequest('입력하신 현재 비밀번호가 유효하지 않습니다.');
  }

  // 새로운 비밀번호를 암호화 해준뒤, 비밀번호를 변경 해줍니다.
  const encryptedPw = await bcrypt.hash(newPw, 8);
  await getRepository(User).update(Number(id), { pw: encryptedPw });

  logger.info(`${id}님의 비밀번호 변경이 완료되었습니다.`);
  return res.status(200).json({ ok: true, message: '비밀번호 변경 완료되었습니다.\n 다시 로그인 해주세요.' });
};

export const updateDesc = async (
  req: Request<updateDescInput['params'], {}, updateDescInput['body']>,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { newDesc } = req.body;

  const isExistingUser = await getRepository(User).count({ id: Number(id) });
  if (!isExistingUser) {
    logger.warn('존재하지 않은 유저가 자기소개 변경을 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }

  // 자기소개를 변경해줍니다.
  await getRepository(User).update(Number(id), { desc: newDesc });

  logger.info(`${id}님의 자기소개 변경이 완료되었습니다.`);
  return res.status(200).json({ ok: true, message: '자기소개 변경 완료되었습니다.', newDesc });
};

export const updateAvatar = async (req: Request<updateAvatarInput['params'], {}, {}>, res: Response): Promise<any> => {
  const userRepo = getCustomRepository(UserRepository);

  const { id } = req.params;
  const newAvatar = (req.file as Express.MulterS3.File).location;
  const newAvatarKey = (req.file as Express.MulterS3.File).key;

  // s3 helper가 오류가 났을경우
  if (!newAvatar || !newAvatarKey) {
    logger.error('s3에서 변경할 프로필 이미지를 받아오지 못했습니다.');
    throw ApiError.InternalServerError('내부적인 문제로 프로필 변경을 실패하였습니다.');
  }

  const user = await getRepository(User).findOne({ id: Number(id) });
  if (!user) {
    logger.warn('존재하지 않은 유저가 프로필사진 변경을 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }
  const currentAvatarKey = user?.avatarKey;
  const defaultAvatarKey = process.env.DEFAULT_AVATAR_KEY as string;

  // 기존의 아바타가 기본 아바타가 아니라면 s3최적화를 위해 삭제한다.
  if (currentAvatarKey !== defaultAvatarKey) s3Delete(req, res, currentAvatarKey);

  // 쿼리빌더를 사용해 한번에 업데이트 한다.
  await userRepo.updateAvatarAndAvatarKey(Number(id), newAvatar, newAvatarKey);

  logger.info(`${id}님의 프로필이미지 변경 완료되었습니다.`);
  return res.status(200).json({ ok: true, message: '프로필이미지 변경 완료되었습니다.', newAvatar, newAvatarKey });
};

export const updateDefaultAvatar = async (
  req: Request<updateDefaultAvatarInput['params'], {}, {}>,
  res: Response
): Promise<any> => {
  const userRepo = getCustomRepository(UserRepository);

  const { id } = req.params;

  const user = await getRepository(User).findOne({ id: Number(id) });
  if (!user) {
    logger.warn('존재하지 않은 유저가 프로필사진 변경을 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }

  const currentAvatarKey = user?.avatarKey;

  // 기본 프로필 사진 데이터입니다.
  const defaultAvatar = process.env.DEFAULT_AVATAR_URL as string;
  const defaultAvatarKey = process.env.DEFAULT_AVATAR_KEY as string;

  // 기존의 아바타가 기본 아바타가 아니라면 s3최적화를 위해 삭제한다.
  if (currentAvatarKey !== defaultAvatarKey) s3Delete(req, res, currentAvatarKey);

  // 쿼리빌더를 사용해 한번에 업데이트 한다.
  await userRepo.updateAvatarAndAvatarKey(Number(id), defaultAvatar, defaultAvatarKey);

  logger.info(`${id}님의 기본이미지로 변경 완료되었습니다.`);
  return res
    .status(200)
    .json({ ok: true, message: '기본이미지로 변경 완료되었습니다.', defaultAvatar, defaultAvatarKey });
};

export const updateCover = async (req: Request<updateCoverInput['params'], {}, {}>, res: Response): Promise<any> => {
  const userRepo = getCustomRepository(UserRepository);

  const { id } = req.params;
  const newCover = (req.file as Express.MulterS3.File).location;
  const newCoverKey = (req.file as Express.MulterS3.File).key;

  // s3 helper가 오류가 났을경우
  if (!newCover || !newCoverKey) {
    logger.error('s3에서 변경할 커버 이미지를 받아오지 못했습니다.');
    throw ApiError.InternalServerError('내부적인 문제로 커버 변경을 실패하였습니다.');
  }

  const user = await getRepository(User).findOne({ id: Number(id) });
  if (!user) {
    logger.warn('존재하지 않은 유저가 프로필사진 변경을 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }
  const currentCoverKey = user?.coverKey;
  const defaultCoverKey = process.env.DEFAULT_Cover_KEY as string;

  // 기존의 아바타가 기본 아바타가 아니라면 s3최적화를 위해 삭제한다.
  if (currentCoverKey !== defaultCoverKey) s3Delete(req, res, currentCoverKey);

  // 쿼리빌더를 사용해 한번에 업데이트 한다.
  await userRepo.updateCoverAndCoverKey(Number(id), newCover, newCoverKey);

  logger.info(`${id}님의 커버이미지 변경 완료되었습니다.`);
  return res.status(200).json({ ok: true, message: '커버이미지 변경 완료되었습니다.', newCover, newCoverKey });
};

export const updateDefaultCover = async (
  req: Request<updateDefaultCoverInput['params'], {}, {}>,
  res: Response
): Promise<any> => {
  const userRepo = getCustomRepository(UserRepository);

  const { id } = req.params;

  const user = await getRepository(User).findOne({ id: Number(id) });
  if (!user) {
    logger.warn('존재하지 않은 유저가 프로필사진 변경을 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }

  const currentCoverKey = user?.coverKey;

  // 기본 프로필 사진 데이터입니다.
  const defaultCover = process.env.DEFAULT_Cover_URL as string;
  const defaultCoverKey = process.env.DEFAULT_Cover_KEY as string;

  // 기존의 아바타가 기본 아바타가 아니라면 s3최적화를 위해 삭제한다.
  if (currentCoverKey !== defaultCoverKey) s3Delete(req, res, currentCoverKey);

  // 쿼리빌더를 사용해 한번에 업데이트 한다.
  await userRepo.updateCoverAndCoverKey(Number(id), defaultCover, defaultCoverKey);

  logger.info(`${id}님의 기본 커버이미지로 변경 완료되었습니다.`);
  return res
    .status(200)
    .json({ ok: true, message: '기본 커버이미지로 변경 완료되었습니다.', defaultCover, defaultCoverKey });
};

export const deleteAccount = async (req: Request<deleteAccountInput['params']>, res: Response): Promise<any> => {
  const { id } = req.params;

  const user = await getRepository(User).findOne({ id: Number(id) });
  if (!user) {
    logger.warn('존재하지 않은 유저가 계정삭제를 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }
  const drawings = await getRepository(Drawing).find({ user_id: Number(id) });
  const imageKeys = await getRepository(ImageKey).find({ user_id: Number(id) });

  const currentAvatarKey = user?.avatarKey;
  const currentCoverKey = user?.coverKey;
  const defaultAvatarKey = process.env.DEFAULT_AVATAR_KEY as string;
  const defaultCoverKey = process.env.DEFAULT_COVER_KEY as string;

  // 기본이미지 제외, 탈퇴한 계정의 프로필 사진을 s3에서 객체삭제 합니다.
  if (currentAvatarKey !== defaultAvatarKey) s3Delete(req, res, currentAvatarKey as string);
  // 기본커버 제외, 탈퇴한 계정의 커버 사진을 s3에서 객체삭제 합니다.
  if (currentCoverKey !== defaultCoverKey) s3Delete(req, res, currentCoverKey as string);
  // s3에 저장된 유저가 올린 모든 그림을 삭제합니다.
  drawings.forEach(async (drawing) => s3Delete(req, res, drawing.key as string));
  // s3에 저장된 유저가 올린 모든 게시물(post) 이미지를 삭제합니다.
  imageKeys.forEach(async (imageKey) => s3Delete(req, res, imageKey.image_key as string));

  await getRepository(User).delete({ id: Number(id) });

  // 레디스에 저장된 대화정보 등등 식제
  await cluster.del(`chats:${user?.chatId}`);
  await cluster.del(`messages:${user?.chatId}`);
  await cluster.del(`msgNotis:${user?.chatId}`);

  // 세션 제거
  req.session.destroy((err: any) => {
    if (err) {
      logger.error('로그아웃시 세션제거 과정 중 에러 발생');
      throw ApiError.InternalServerError('내부적인 문제로 로그아웃 실패하였습니다.');
    }
  });

  logger.info(`${id}님 계정 삭제 성공 하였습니다.`);
  return res.status(200).clearCookie('sid').json({ ok: true, message: '계정이 정상적으로 삭제되었습니다.' });
};