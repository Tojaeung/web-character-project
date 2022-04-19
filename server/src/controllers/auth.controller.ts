import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getCustomRepository, getRepository } from 'typeorm';
import { User } from '@src/entities/user/user.entity';
import { UserRepository } from '@src/repositorys/user.repository';
import logger from '@src/helpers/winston.helper';
import { sendAuthEmail, sendFindEmail } from '@src/helpers/nodemailer.helper';

const authController = {
  // 회원가입  API 입니다.
  signUp: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      const { email, nickname, pw } = req.body;

      // 기존 이메일 존재 유무를 확인합니다.
      const existingEmail = await userRepo.findUserByEmail(email);
      if (existingEmail) {
        logger.info('이미 존재하는 이메일 입니다.');
        return res.status(400).json({ ok: false, message: '이미 존재하는 이메일 입니다.' });
      }

      // 기존 닉네임 존재 유무를 확인합니다.
      const existingNickname = await userRepo.findUserByNickname(nickname);
      if (existingNickname) {
        logger.info('이미 존재하는 닉네임 입니다.');
        return res.status(400).json({ ok: false, message: '이미 존재하는 닉네임입니다.' });
      }

      // 비밀번호를 암호화 합니다.
      const encryptedPw = await bcrypt.hash(pw, 8);
      const emailToken = await bcrypt.hash(email, 8);
      const pwToken = await bcrypt.hash(nickname, 8);

      // 유저 테이블에 정보를 저장합니다.
      const user = new User();
      user.email = email;
      user.nickname = nickname;
      user.pw = encryptedPw;
      user.emailToken = emailToken;
      user.pwToken = pwToken;
      await getRepository(User).save(user);

      // 인증이메일을 발송합니다.
      await sendAuthEmail(req, res, email, emailToken);

      /*
       * 클라이언트에 엑세스토큰를 쿠키로 보냅니다. (만료기한 7일)
       * 클라이언트에게 새로 생성된 유저정보를 보내 줍니다.
       */
      logger.info('회원가입 되었습니다.');
      return res.status(200).json({ ok: true, message: '회원가입 되었습니다.' });
    } catch (err: any) {
      logger.error('회원가입 에러: ', err);
      return res.status(500).json({ ok: false, message: '회원가입 에러' });
    }
  },

  // 로그인 API 입니다.
  login: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);

    try {
      const { email, pw } = req.body;

      // 유효한 email인지 확인하기 위해 email를 조회합니다.
      const existingUser = await userRepo.findUserByEmail(email);
      if (!existingUser) {
        logger.info('회원 이메일이 존재하지 않습니다.');
        return res.status(400).json({ ok: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
      }

      // 유효한 이메일이라면 비밀번호가 맞는지 확인합니다.
      const decryptedPw = await bcrypt.compare(pw, existingUser.pw as string);
      if (!decryptedPw) {
        logger.info('비밀번호가 틀렸습니다.');
        return res.status(400).json({ ok: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
      }

      // 인증되지 않은 회원일 경우에 다시 인증메일을 발송합니다.
      if (!existingUser?.isVerified) {
        await sendAuthEmail(req, res, existingUser.email, existingUser.emailToken as string);
        logger.info('이메일 인증을 받지 않은 회원입니다.');
        return res.status(400).json({ ok: false, message: '인증되지 않은 사용자 입니다. 이메일 인증을 확인해주세요' });
      }

      req.session.user = {
        id: existingUser.id,
        chatId: existingUser.chatId,
        role: existingUser.role,
        exp: existingUser.exp,
      };
      req.session.save(() => {
        logger.info('로그인 되었습니다.');
        return res.status(200).json({ ok: true, message: '로그인 되었습니다.', user: existingUser });
      });
    } catch (err: any) {
      console.log(err);
      logger.error('로그인 에러:', err);
      return res.status(500).json({ ok: false, message: '로그인 에러' });
    }
  },

  // 로그아웃 API입니다.
  logout: async (req: Request, res: Response) => {
    try {
      req.session.destroy((err: any) => {
        if (err) {
          logger.warn('로그아웃시 세션제거 과정 중 에러 발생');
          return res.status(400).json({ ok: false, message: '로그아웃이 되지 않습니다.' });
        }
      });
      logger.info('로그아웃 되었습니다.');
      return res.status(200).clearCookie('sid').redirect('/');
    } catch (err: any) {
      logger.error('로그아웃 에러:', err);
      return res.status(500).clearCookie('sid').json({ ok: false, message: '로그아웃 에러' });
    }
  },

  // refresh시 다시 유저정보를 보내주는 API입니다.
  refreshLogin: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      if (!req.session.user) {
        logger.info('로그인 상태가 아니기 때문에 로그인 갱신 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '세션정보가 없습니다.' });
      }

      const id = req.session.user!.id;

      const user = await userRepo.findUserById(id);
      if (!user) {
        req.session.destroy((err: any) => {
          logger.warn('세션제거 과정 중 에러 발생');
          return res.status(400).json({ ok: false, message: '세션제거 과정 중 에러 발생' });
        });
        logger.info('유저가 존재하지 않아 로그인 정보 갱신에 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '로그인 정보 갱신 실패하였습니다.' });
      }

      logger.info('로그인 정보가 갱신되었습니다.');
      return res.status(200).json({ ok: true, message: '로그인 정보가 갱신되었습니다.', user });
    } catch (err: any) {
      logger.error('로그인 갱신을 실패하였습니다.', err);
      return res.status(500).json({ ok: false, message: '로그인 갱신 에러' });
    }
  },

  // 이메일 인증을 위한 API입니다.
  verifyUser: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      // nodemailer.config.ts에서 보낸 쿼리 입니다.
      const { email, emailToken } = req.query;

      // 이메일 토큰으로 유저의 auth 정보를 가져온다.
      const user = await userRepo.findUserByEmail(email as string);
      if (!user) {
        logger.warn('이메일토큰 정보로 회원을 찾을 수 없습니다.');
        return res.status(400).json({ ok: false, message: '인증이 실패하였습니다.' });
      }

      /*
       *  이메일토큰이 유효하다면 로그인이 가능 합니다.
       *  auth 테이블에 emailToken과 isVerified 정보를 수정해서 이메일 인증을 완료합니다.
       *  로그인이 가능한 계정입니다.
       */
      const decryptedEmailToken = await bcrypt.compare(email as string, emailToken as string);
      if (decryptedEmailToken) {
        user.emailToken = null;
        user.isVerified = true;
        await getRepository(User).save(user);
      }

      // 로그인을 위해 클라이언트의 홈페이지로 리다이렉트 합니다.
      logger.info('이메일 인증확인 성공하였습니다.');
      return res.status(200).redirect(process.env.CLIENT_ADDR as string);
    } catch (err: any) {
      logger.error('이메일 인증확인 에러: ', err);
      return res.status(500).json({ ok: false, message: '이메일 인증확인 에러' });
    }
  },

  // 비밀번호를 찾기 위한 API입니다.
  findPw: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      const { email } = req.body;

      // 요청받은 email로 유저를 찾습니다.
      const user = await userRepo.findUserByEmail(email);
      if (!user) {
        logger.info('이메일이 존재하지 않습니다.');
        return res.status(400).json({ ok: false, message: '이메일이 존재하지 않습니다.' });
      }

      /*
       * 유저가 존재한다면 비밀번호 찾기 인증 메일을 발송합니다.
       * 비밀번호 인증을 위해 auth테이블에 pwToken이 필요합니다.
       */
      await sendFindEmail(req, res, email, user?.pwToken as string);

      return res.status(200).json({ ok: true, message: '인증 이메일을 발송하였습니다.' });
    } catch (err: any) {
      logger.error('비밀번호 찾기 에러', err);
      return res.status(500).json({ ok: false, message: '유효한 이메일 에러' });
    }
  },

  // 비밀번호 인증을 위한 API 입니다.
  verifyPw: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      // nodemailer.config.ts에서 온 쿼리정보 입니다.
      const { pwToken } = req.query;

      /*
       * 요청받은 이메일로 유저를 찾습니다.
       * 쿼리스트링을 숫자형으로 바꿔준다.
       */
      const user = await userRepo.findUserByPwToken(pwToken as string);
      if (!user) {
        logger.info('비밀번호 인증확인이 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '비밀번호 인증확인이 실패하였습니다.' });
      }

      /*
       * 이메일토큰은 이메일과 연결되어있고 비밀번호토큰은 닉네임과 연결되어 있습니다.
       * 클라이언트에 비밀번호토큰을 쿼리정보로 포함하여 보내줍니다.
       */
      const decryptedPwToken = await bcrypt.compare(user.nickname, pwToken as string);
      if (decryptedPwToken) {
        logger.info('비밀번호 인증확인 성공하였습니다.');
        return res.status(200).redirect(`${process.env.CLIENT_ADDR}/auth/editPw?pwToken=${pwToken}`);
      }
    } catch (err: any) {
      logger.error('비밀번호 인증확인 에러: ', err);
      return res.status(500).json({ ok: false, message: '비밀번호 인증확인 에러' });
    }
  },

  // 비밀번호를 변경하기 위한 API 입니다.
  editPw: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);

    try {
      const { pw, pwToken } = req.body;

      // 요청받은 pwToken으로 auth 테이블 정보를 불러옵니다.
      const user = await userRepo.findUserByPwToken(pwToken);
      if (!user) {
        logger.warn('비밀번호 토큰과 일치하는 유저가 없습니다.');
        return res.status(400).json({ ok: false, message: '비밀번호 변경 실패하였습니다.' });
      }
      /*
       * 클라이언트에서 받아온 비밀번호를 헤싱하여 데이터베이스에 저장 합니다.
       *  보안을 위해 pwToken을 새롭게 발급하고 데이터베이스에 저장합니다.
       */
      const encryptedPw = await bcrypt.hash(pw, 8);
      const newPwToken = await bcrypt.hash(user?.nickname as string, 8);

      // 변경된 pw, pwToken을 각각 user, auth 테이블에 업데이트한다.
      await userRepo.updatePwAndPwToken(user?.id, encryptedPw, newPwToken);

      logger.info('비밀번호가 재설정 되었습니다.');
      return res.status(200).json({ ok: true, message: '비밀번호가 재설정 되었습니다.' });
    } catch (err: any) {
      logger.error('비밀번호 변경 에러: ', err);
      return res.status(500).json({ ok: false, message: '비밀번호 변경 에러' });
    }
  },
};

export default authController;
