import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getCustomRepository, getRepository } from 'typeorm';
import logger from '@helpers/winston.helper';
import { SignInDTO } from '@schemas/session.schema';
import { sendAuthEmail } from '@helpers/nodemailer.helper';
import ApiError from '@errors/api.error';
import { UserRepository } from '@repositorys/user.repository';
import User from '@entities/profile/user.entity';

export const signIn = async (req: Request<{}, {}, SignInDTO['body']>, res: Response) => {
  const userRepo = getCustomRepository(UserRepository);

  const { email, pw } = req.body;

  // 유효한 email인지 확인하기 위해 email를 조회합니다.
  // pw칼럼은 select: false 처리가 되어있기 때문에 쿼리빌더 addSelect를 이용해서 불러온다.
  const user = await userRepo.findWithPwByEmail(email);
  if (!user) {
    logger.warn('이메일이 존재하지 않습니다.');
    throw ApiError.BadRequest("'아이디 또는 비밀번호가 올바르지 않습니다.");
  }

  // 유효한 이메일이라면 비밀번호가 맞는지 확인합니다.
  const decryptedPw = await bcrypt.compare(pw, user?.pw as string);
  if (!decryptedPw) {
    logger.warn('비밀번호가 틀렸습니다.');
    throw ApiError.BadRequest('아이디 또는 비밀번호가 올바르지 않습니다.');
  }

  // 인증되지 않은 회원일 경우에 다시 인증메일을 발송합니다.
  if (!user?.isVerified) {
    await sendAuthEmail(user.email, user.emailToken as string);
    logger.warn('이메일 인증을 받지 않은 회원이 로그인을 시도합니다.');
    throw ApiError.Unauthorized('인증되지 않은 사용자 입니다.\n이메일 인증을 보냈으니 확인해주세요.');
  }

  // 로그인시, 비밀번호와 같이 불러온 user에서 pw속성을 제거하고 클라이언트에 보내준다.
  delete user.pw;

  req.session.user = {
    id: user.id,
    chatId: user.chatId,
    role: user.role,
    isPenalty: user.isPenalty,
  };
  req.session.save(() => {
    logger.info('로그인 되었습니다.');
    return res.status(200).json({ ok: true, message: '로그인 되었습니다.', user });
  });
};

export const refreshLogin = async (req: Request, res: Response): Promise<any> => {
  const id = req.session.user?.id!;

  const user = await getRepository(User).findOne({ id });
  if (!user) {
    req.session.destroy((err: any) => {
      if (err) {
        logger.error('내부적인 문제로 로그아웃 실패하였습니다.');
        throw ApiError.InternalServerError('로그아웃 실패하였습니다.');
      } else {
        logger.info('로그아웃 성공하였습니다.');
        return res.status(200).clearCookie('sid').json({ ok: true, message: '로그아웃 성공하였습니다.' });
      }
    });
    logger.warn('존재하지 않는 유저가 로그인 정보를 새로 가져오려고 합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }

  req.session.user = {
    id: user.id,
    chatId: user.chatId,
    role: user.role,
    isPenalty: user.isPenalty,
  };
  req.session.save(() => {
    logger.info('로그인 정보를 새로 불러왔습니다.');
    return res.status(200).json({ ok: true, message: '로그인 정보를 새로 불러왔습니다.', user });
  });
};

export const signOut = async (req: Request, res: Response): Promise<any> => {
  req.session.destroy((err: any) => {
    if (err) {
      logger.error('내부적인 문제로 로그아웃 실패하였습니다.');
      throw ApiError.InternalServerError('로그아웃 실패하였습니다.');
    } else {
      logger.info('로그아웃 성공하였습니다.');
      return res.status(205).clearCookie('sid').json({ ok: true, message: '로그아웃 성공하였습니다.' });
    }
  });
};
