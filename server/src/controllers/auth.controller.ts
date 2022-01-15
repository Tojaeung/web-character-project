import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '@src/entities/user.entity';
import { UserType } from '@src/types/user.type';
import redisClient from '@src/helpers/redis.helper';
import logger from '@src/helpers/winston.helper';
import { sendRegisterEmail, sendFindEmail } from '@src/helpers/nodemailer.helper';

const authController = {
  // 회원가입  API 입니다.
  register: async (req: Request, res: Response) => {
    try {
      const { email, nickname, pw, bank, accountNumber } = req.body;

      // 기존 이메일 존재 유무를 확인합니다.
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        logger.info('이미 존재하는 닉네임 입니다.');
        return res.status(200).json({ ok: false, message: '이미 존재하는 이메일 입니다.' });
      }

      // 기존 닉네임 존재 유무를 확인합니다.
      const existingNickname = await User.findOne({ nickname });
      if (existingNickname) {
        logger.info('이미 존재하는 닉네임 입니다.');
        return res.status(200).json({ ok: false, message: '이미 존재하는 닉네임입니다.' });
      }

      // 비밀번호를 암호화 합니다.
      const encryptedPw = await bcrypt.hash(pw, 8);
      const emailToken = await bcrypt.hash(email, 8);
      const pwToken = await bcrypt.hash(nickname, 8);

      // 데이터베이스에 가입정보를 저장합니다.
      const user = await User.create({
        email,
        nickname,
        pw: encryptedPw,
        bank,
        accountNumber,
        emailToken,
        pwToken,
      }).save();

      // 인증이메일을 발송합니다.
      await sendRegisterEmail(req, res, email, emailToken);

      /*
       * 클라이언트에 엑세스토큰를 쿠키로 보냅니다. (만료기한 7일)
       * 클라이언트에게 새로 생성된 유저정보를 보내 줍니다.
       */
      logger.info('회원가입 되었습니다.');
      return res.status(200).json({ ok: true, message: '회원가입 되었습니다.' });
    } catch (err: any) {
      logger.error('회원가입 에러: ', err);
      return res.status(500).json({ message: '회원가입 에러' });
    }
  },

  // 로그인 API 입니다.
  login: async (req: Request, res: Response) => {
    try {
      const { email, pw } = req.body;

      // 유효한 email인지 확인하기 위해 email를 조회합니다.
      const user = (await User.findOne({ email })) as UserType;
      if (!user) {
        logger.info('회원 이메일이 존재하지 않습니다.');
        return res.status(200).json({ ok: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
      }

      // 유효한 이메일이라면 비밀번호가 맞는지 확인합니다.
      const decryptedPw = await bcrypt.compare(pw, user.pw as string);
      if (!decryptedPw) {
        logger.info('비밀번호가 틀렸습니다.');
        return res.status(200).json({ ok: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
      }

      // 인증되지 않은 회원일 경우에 다시 인증메일을 발송합니다.
      if (!user.isVerified) {
        await sendRegisterEmail(req, res, user.email, user.emailToken as string);
        logger.info('이메일 인증을 받지 않은 회원입니다.');
        return res.status(200).json({ ok: false, message: '인증되지 않은 사용자 입니다.' });
      }

      delete user.pw;
      delete user.pwToken;

      // 엑세스토큰과 리프레쉬토큰을 생성합니다.
      const accessToken = await createAccessToken(user);
      const refreshToken = await createRefreshToken(user.id);

      /*
       * 엑세스 토큰을 클라이언트에 보내줍니다.
       * 클라이언트에게 로그인 정보를 보내줍니다.
       */
      logger.info('로그인 되었습니다.');
      return res
        .status(200)
        .cookie('accessToken', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 1 })
        .cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 14 })
        .json({ ok: true, message: '로그인 되었습니다.', user, token: accessToken });
    } catch (err: any) {
      logger.error('로그인 에러:', err);
      return res.status(500).json({ message: '로그인 에러' });
    }
  },

  // 로그아웃 API입니다.
  logout: async (req: Request, res: Response) => {
    try {
      const { id } = res.locals.user;

      // 레디스에 저장된 리프레쉬 토큰을 삭제합니다.
      const result = await redisClient.del(id.toString());

      logger.info('로그아웃 되었습니다.');
      return res
        .status(200)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json({ ok: true, message: '로그아웃 되었습니다.' });
    } catch (err: any) {
      logger.error('로그아웃 에러:', err);
      return res.status(500).json({ message: '로그아웃 에러' });
    }
  },

  // 새로운 AT을 발급하는 API입니다.
  refreshToken: async (req: Request, res: Response) => {
    try {
      const { accessToken, refreshToken } = req.cookies;

      // AT와 RT가 모두 존재하는 경우 => 토큰 재발급
      if (accessToken && refreshToken) {
        const decodedAT = (await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string)) as JwtPayload;
        const newAccessToken = await createAccessToken(decodedAT.user);
        logger.info('AT,RT 모든 토큰이 존재합니다.');
        return res
          .status(200)
          .cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 1 })
          .json({ ok: true, message: '토큰이 존재합니다.', user: decodedAT.user, token: newAccessToken });
      }

      // AT는 존재하지만 RT가 존재하지 않는 경우 => 로그아웃
      if (accessToken && !refreshToken) {
        logger.info('리프레쉬 토큰이 존재하지 않습니다.');
        return res.status(200).clearCookie('accessToken').json({ ok: false, message: '토큰이 존재하지 않습니다.' });
      }

      // AT는 존재하지 않지만 RT가 존재하는 경우 => 로그아웃
      if (!accessToken && !refreshToken) {
        logger.info('AT,RT 모든 토큰이 존재하지 않습니다.');
        return res.status(200).json({ ok: false, message: '토큰이 존재하지 않습니다.' });
      }

      // AT는 존재하지 않지만 RT가 존재하는 경우 => 토큰 재발급
      if (!accessToken && refreshToken) {
        // RT정보가 일치하는지 확인하기 위해 request RT 정보를 이용하여 레디스의 RT정보를 불러옵니다.
        const decodedRT = (await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string)) as JwtPayload;
        const redisRT = await redisClient.get(decodedRT.id.toString());

        if (!redisRT) {
          logger.warn('레디스의 RT가 존재하지 않습니다.');
          return res.status(400).json({ message: '토큰의 정보가 일치하지 않습니다.' });
        } else {
          // 만약 request RT와 레디스 RT의 정보가 같다면 새로운 AT를 발급합니다.
          if (JSON.parse(redisRT) === refreshToken) {
            const user = (await User.findOne({ id: decodedRT.id })) as UserType;
            delete user.pw;
            delete user.pwToken;
            const newAccessToken = await createAccessToken(user);
            logger.info('RT로 새로운 AT을 발급하였습니다.');
            return res
              .status(200)
              .cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 1 })
              .json({
                ok: true,
                message: '새로운 AT을 발급하였습니다.',
                user,
                token: newAccessToken,
              });
          } else {
            logger.warn('redisRT과 request의 RT가 일치하지 않습니다.');
            return res.status(400).json({ message: '토큰을 발급하지 못했습니다.' });
          }
        }
      }
    } catch (err: any) {
      logger.error('새로운 AT 발급 에러 :', err);
      return res.status(500).json({ message: '토큰 발급 에러' });
    }
  },

  // 이메일 인증을 위한 API입니다.
  verifyUser: async (req: Request, res: Response) => {
    try {
      // nodemailer.config.ts에서 보낸 쿼리 입니다.
      const { emailToken } = req.query;
      const user = await User.findOne({ emailToken: emailToken as string });

      if (!user) {
        logger.warn('이메일토큰 정보로 회원을 찾을 수 없습니다.');
        return res.status(400).json({ message: '인증이 실패하였습니다.' });
      }

      // 이메일토큰이 유효하다면 로그인이 가능 합니다.
      const decryptedEmailToken = await bcrypt.compare(user.email, emailToken as string);
      if (decryptedEmailToken) {
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
      }

      // 로그인을 위해 클라이언트의 홈페이지로 리다이렉트 합니다.
      logger.info('이메일 인증확인 성공하였습니다.');
      return res.status(200).redirect(process.env.CLIENT_ADDR as string);
    } catch (err: any) {
      logger.error('이메일 인증확인 에러: ', err);
      return res.status(500).json({ message: '이메일 인증확인 에러' });
    }
  },

  // 비밀번호를 찾기 위한 API입니다.
  findPw: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        logger.info('이메일이 존재하지 않습니다.');
        return res.status(200).json({ ok: false, message: '이메일이 존재하지 않습니다.' });
      }

      // 유저가 존재한다면 비밀번호 찾기 인증 메일을 발송합니다.
      await sendFindEmail(req, res, email, user.pwToken);

      return res.status(200).json({ ok: true, message: '인증 이메일을 발송하였습니다.' });
    } catch (err: any) {
      logger.error('비밀번호 찾기 에러', err);
      return res.status(500).json({ message: '유효한 이메일 에러' });
    }
  },

  // 비밀번호 인증을 위한 API 입니다.
  verifyPw: async (req: Request, res: Response) => {
    try {
      // nodemailer.config.ts에서 온 쿼리정보 입니다.
      const { pwToken } = req.query;
      const user = await User.findOne({ pwToken: pwToken as string });

      if (!user) {
        logger.info('비밀번호 인증확인이 실패하였습니다.');
        return res.status(200).json({ ok: false, message: '비밀번호 인증확인이 실패하였습니다.' });
      }

      /*
       * 이메일토큰은 이메일과 연결되어있고 비밀번호토큰은 닉네임과 연결되어 있습니다.
       * 클라이언트에 비밀번호토큰을 쿼리정보로 포함하여 보내줍니다.
       */
      const decryptedPwToken = await bcrypt.compare(user.nickname, pwToken as string);
      if (decryptedPwToken) {
        logger.info('비밀번호 인증확인 성공하였습니다.');
        return res.status(200).redirect(`${process.env.CLIENT_ADDR}/changePw?pwToken=${pwToken}`);
      }
    } catch (err: any) {
      logger.error('비밀번호 인증확인 에러: ', err);
      return res.status(500).json({ message: '비밀번호 인증확인 에러' });
    }
  },

  // 비밀번호를 변경하기 위한 API 입니다.
  changePw: async (req: Request, res: Response) => {
    try {
      const { pw, pwToken } = req.body;
      const user = await User.findOne({ pwToken: pwToken as string });

      if (!user) {
        logger.warn('비밀번호 토큰과 일치하는 유저가 없습니다.');
        return res.status(400).json({ message: '비밀번호 변경 실패하였습니다.' });
      }

      /*
       * 클라이언트에서 받아온 비밀번호를 헤싱하여 데이터베이스에 저장 합니다.
       *  보안을 위해 pwToken을 새롭게 발급하고 데이터베이스에 저장합니다.
       */
      const encryptedPw = await bcrypt.hash(pw, 8);
      const newPwToken = await bcrypt.hash(user.nickname, 8);
      user.pw = encryptedPw;
      user.pwToken = newPwToken;
      user.save();

      logger.info('비밀번호가 재설정 되었습니다.');
      return res.status(200).json({ ok: true, message: '비밀번호가 재설정 되었습니다.' });
    } catch (err: any) {
      logger.error('비밀번호 변경 에러: ', err);
      return res.status(500).json({ message: '비밀번호 변경 에러' });
    }
  },
};

// 엑세스토큰 생성 함수 입니다.
const createAccessToken = async (user: UserType) => {
  const accessToken = await jwt.sign({ user }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '1d',
  });
  return accessToken;
};

// 리프레쉬토큰 생성 함수 입니다.
const createRefreshToken = async (id: number) => {
  const refreshToken = await jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '14d',
  });

  // 레디스에 유저의 리프레쉬 토큰을 저장합니다.
  redisClient.set(id.toString(), JSON.stringify(refreshToken));

  return refreshToken;
};

export default authController;
