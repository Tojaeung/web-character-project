import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { User } from '@src/entities/user.entity';
import { UserType } from '@src/types/user.type';
import redisClient from '@src/config/redis.config';
import logger from '@src/config/winston';

const authController = {
  // 회원가입  API 입니다.
  register: async (req: Request, res: Response) => {
    try {
      const { email, nickname, pw, bank, accountNumber } = req.body;

      // 기존 닉네임 존재 유무를 확인합니다.
      const existingNickname = await User.findOne({ nickname });
      if (existingNickname) {
        logger.warn('이미 존재하는 닉네임 입니다.');
        return res.status(400).json({ status: false, message: '이미 존재하는 닉네임입니다.' });
      }

      // 비밀번호를 암호화 합니다.
      const hashedPw = await argon2.hash(pw);

      // 데이터베이스에 가입정보를 저장합니다.
      const user: UserType = await User.create({ email, nickname, pw: hashedPw, bank, accountNumber }).save();

      // 엑세스 토큰과 리프레쉬 토큰을 발급합니다.
      createRefreshToken(nickname);
      const accessToken = createAccessToken(nickname);

      /*
       * 클라이언트에 엑세스토큰를 쿠키로 보냅니다. (만료기한 7일)
       * 클라이언트에게 새로 생성된 유저정보를 보내 줍니다.
       */
      logger.info('회원가입 되었습니다.');
      return res
        .status(200)
        .cookie('accessToken', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
        .json({ status: true, message: '회원가입 되었습니다.', data: user });
    } catch (err: any) {
      logger.error('회원가입 에러: ', err.message);
      return res.status(500).json({ status: false, message: '회원가입 에러' });
    }
  },

  // 로그인 API 입니다.
  login: async (req: Request, res: Response) => {
    try {
      const { email, pw } = req.body;

      // 유효한 email인지 확인하기 위해 email를 조회합니다.
      const user = await User.findOne({ email });
      if (!user) {
        logger.warn('회원이 존재하지 않습니다.');
        return res.status(400).json({ status: false, message: '회원이 존재하지 않습니다.' });
      }

      // 유효한 이메일이라면 비밀번호가 맞는지 확인합니다.
      const decryptedPw = await argon2.verify(user.pw, pw);
      if (!decryptedPw) {
        logger.warn('아이디 또는 비밀번호가 틀렸습니다.');
        return res.status(400).json({ status: false, message: '아이디 또는 비밀번호가 틀렸습니다.' });
      }

      // 엑세스토큰과 리프레쉬토큰을 생성합니다.
      createRefreshToken(user.id);
      const accessToken = createAccessToken(user.id);

      /*
       * 엑세스 토큰을 클라이언트에 보내줍니다.
       * 클라이언트에게 로그인 정보를 보내줍니다.
       */
      logger.info('로그인 되었습니다.');
      return res
        .status(200)
        .cookie('accessToken', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
        .json({ status: true, message: '로그인 되었습니다.', data: user });
    } catch (err: any) {
      logger.error('로그인 에러:', err.message);
      return res.status(500).json({ status: false, message: '로그인 에러' });
    }
  },

  // 로그아웃 API입니다.
  logout: async (req: Request, res: Response) => {
    try {
      const { id } = res.locals.user.id;
      await redisClient.del(id.toString());

      logger.info('로그아웃 되었습니다.');
      return res.status(200).clearCookie('accessToken').json({ message: '로그아웃 되었습니다.' });
    } catch (err: any) {
      logger.error('로그아웃 에러:', err.message);
      return res.status(500).json({ status: false, message: '로그아웃 에러' });
    }
  },
};

// 엑세스토큰 생성 함수 입니다.
const createAccessToken = async (id: number) => {
  const accessToken = await jwt.sign({ id: id.toString() }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '7d',
  });
  return accessToken;
};

// 리프레쉬토큰 생성 함수 입니다.
const createRefreshToken = async (id: number) => {
  const refreshToken = await jwt.sign({ id: id.toString() }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '30d',
  });

  // 레디스에 유저의 리프레쉬 토큰을 저장합니다.
  redisClient.set(id.toString(), JSON.stringify(refreshToken));

  return refreshToken;
};

export default authController;
