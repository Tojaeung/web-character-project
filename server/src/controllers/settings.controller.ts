import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import logger from '@src/helpers/winston.helper';
import { sendChangeEmail } from '@src/helpers/nodemailer.helper';
import { s3Delete } from '@src/utils/s3.utils';
import { UserRepository } from '@src/repositorys/user.repository';
import cluster from '@src/helpers/redis.helper';
import { DrawingRepository } from '@src/repositorys/drawing.repository';
import { ImageKeyRepository } from '@src/repositorys/board.repository';

const settingsController = {
  // 이메일 변경을 위한 API입니다. (변경을 위해서 이메일 인증이 필요합니다.)
  editEmail: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      const id = req.session.user?.id;
      const user = await userRepo.findUserById(id as number);

      const newEmail = req.body.email;
      const currentEmail = user?.email;

      // 변경할 이메일이 존재하는지 확인합니다.
      const existingEmail = await userRepo.findUserByEmail(newEmail);
      if (existingEmail) {
        return res.status(400).json({ ok: false, message: '이미 존재하는 이메일 입니다.' });
      }

      /*
       * 이메일 변경 인증 메일을 발송합니다.
       * 인증확인은 verifyEmail API에서 처리됩니다.
       */
      await sendChangeEmail(req, res, newEmail, currentEmail);

      logger.info('이메일 변경 인증 메세지를 보냈습니다.');
      return res.status(200).json({ ok: true, message: '이메일 인증 메세지를 보냈습니다.' });
    } catch (err: any) {
      logger.error('이메일 변경 에러', err);
      return res.status(500).json({ ok: false, message: '이메일 변경 에러' });
    }
  },

  // 닉네임을 바꾸는 API입니다.
  editNickname: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      const newNickname = req.body.nickname;
      const id = req.session.user?.id;

      // 변경할 닉네임이 존재하는지 확인합니다.
      const existingNickname = await userRepo.findUserByNickname(newNickname);
      if (existingNickname) return res.status(400).json({ ok: false, message: '이미 존재하는 닉네임 입니다.' });

      const result = await userRepo.updateNickname(id as number, newNickname);
      if (result.affected === 0) {
        logger.info('닉네임 변경 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '닉네임 변경 실패하였습니다.' });
      }

      logger.info('닉네임 변경 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '닉네임이 성공되었습니다.', newNickname });
    } catch (err) {
      logger.error('닉네임 변경 에러', err);
      return res.status(500).json({ ok: false, message: '닉네임 변경 에러' });
    }
  },

  // 비밀번호를 변경하는 API 입니다.
  editPw: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      const { currentPw, newPw } = req.body;
      const id = req.session.user?.id;

      // 비밀번호 일치 확인
      const user = await userRepo.findUserById(id as number);
      const decryptedPw = await bcrypt.compare(currentPw, user?.pw as string);
      if (!decryptedPw) return res.status(400).json({ ok: false, message: '비밀번호가 틀렸습니다.' });

      // 일치하면 비밀번호 변경
      const encryptedPw = await bcrypt.hash(newPw, 8);

      const result = await userRepo.updatePw(id as number, encryptedPw);
      if (result.affected === 0) {
        logger.info('비밀번호 변경 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '비밀번호 변경 실패하였습니다.' });
      }

      return res.status(200).json({ ok: true, message: '비밀번호가 변경되었습니다. 다시 로그인 해주세요.' });
    } catch (err: any) {
      logger.error('비밀번호 변경 에러', err);
      return res.status(500).json({ ok: false, message: '비밀번호 변경 에러' });
    }
  },

  // 프로필 사진을 변경하는 API 입니다.
  editAvatar: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      // s3 helper에서 받아온 file 속성
      const newAvatar = (req.file as Express.MulterS3.File).location;
      const newAvatarKey = (req.file as Express.MulterS3.File).key;

      const id = req.session.user?.id;
      const user = await userRepo.findUserById(id as number);

      const currentAvatarKey = user?.avatarKey;
      const defaultAvatarKey = process.env.DEFAULT_AVATAR_KEY as string;

      // s3 helper가 오류가 났을경우
      if (!newAvatar || !newAvatarKey) {
        logger.warn('s3에서 변경할 프로필 이미지를 받아오지 못했습니다.');
        return res.status(400).json({ message: '변경할 프로필 이미지를 찾지 못했습니다.' });
      }

      // 현재 아바타가 기본 아바타가 아니면 s3에서 삭제한다.
      if (currentAvatarKey !== defaultAvatarKey) {
        // s3 최적화를 위해 현재 아바타가 기본 아바타가 아니라면 현재아바타를 삭제한다.
      }

      // user테이블에 avatar, avatarKey 정보를 업데이트 합니다.
      const result = await userRepo.updateAvatar(id as number, newAvatar, newAvatarKey);

      if (result.affected === 0) {
        logger.info('프로필 이미지 변경 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '프로필 이미지 변경 실패하였습니다.' });
      }

      logger.info('프로필 이미지 변경 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '프로필 사진을 변경하였습니다.', newAvatar, newAvatarKey });
    } catch (err: any) {
      logger.error('프로필사진 변경 에러', err);
      return res.status(500).json({ ok: false, message: '프로필 사진 변경 에러' });
    }
  },

  // 프로필이미지를 기본 이미지로 바꾸는 API입니다.
  defaultAvatar: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      const id = req.session.user?.id;
      const user = await userRepo.findUserById(id as number);

      const currentAvatarKey = user?.avatarKey;
      // 기본 프로필 사진 데이터입니다.
      const defaultAvatarUrl = process.env.DEFAULT_AVATAR_URL as string;
      const defaultAvatarKey = process.env.DEFAULT_AVATAR_KEY as string;

      // 현재 프로필 사진이 기본 이미지가 아닐때 이전 프로필 사진을 s3 객체삭제 합니다.
      if (currentAvatarKey !== defaultAvatarKey) s3Delete(req, res, currentAvatarKey as string);

      // 기본 프로필 이미지로 바꾸기 위해 user테이블을 업데이트 시켜준다.
      const result = await userRepo.updateAvatar(id as number, defaultAvatarUrl, defaultAvatarKey);

      if (result.affected === 0) {
        logger.info('프로필 기본이미지 변경 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '프로필  기본이미지 변경 실패하였습니다.' });
      }

      logger.info('프로필 기본이미지 변경 성공하였습니다.');
      return res
        .status(200)
        .json({ ok: true, message: '프로필 기본이미지 변경 성공하였습니다.', defaultAvatarUrl, defaultAvatarKey });
    } catch (err: any) {
      logger.error('기본 프로필 사진 변경 에러', err);
      return res.status(500).json({ ok: false, message: '기본 프로필 이미지 변경 에러' });
    }
  },

  editCover: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      // s3 helper에서 받아온 file 속성
      const newCover = (req.file as Express.MulterS3.File).location;
      const newCoverKey = (req.file as Express.MulterS3.File).key;

      const id = req.session.user?.id;
      const user = await userRepo.findUserById(id as number);

      const currentCoverKey = user?.coverKey;
      const defaultCoverKey = process.env.DEFAULT_COVER_KEY as string;

      // s3 helper가 오류가 났을경우
      if (!newCover || !newCoverKey) {
        logger.warn('s3에서 변경할 커버 이미지을 받아오지 못했습니다.');
        return res.status(400).json({ message: '변경할 커버 이미지를 찾지 못했습니다.' });
      }

      // s3 최적화를 위해 현재 아바타가 기본 아바타가 아니라면 현재아바타를 삭제한다.
      if (currentCoverKey !== defaultCoverKey) s3Delete(req, res, currentCoverKey as string);

      // user테이블에 avatar, avatarKey 정보를 업데이트 합니다.
      const result = await userRepo.updateCover(id as number, newCover, newCoverKey);

      if (result.affected === 0) {
        logger.info('커버 이미지를 변경 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '커버 이미지를 변경 실패하였습니다.' });
      }

      logger.info('커버 이미지를 변경하였습니다.');
      return res.status(200).json({ ok: true, message: '커버 이미지를 변경하였습니다.', newCover, newCoverKey });
    } catch (err: any) {
      logger.error('프로필사진 변경 에러', err);
      return res.status(500).json({ ok: false, message: '커버 이미지 변경 에러' });
    }
  },

  defaultCover: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      const id = req.session.user?.id;
      const user = await userRepo.findUserById(id as number);

      const currentCoverKey = user?.coverKey;
      // 기본 프로필 사진 데이터입니다.
      const defaultCoverUrl = process.env.DEFAULT_COVER_URL as string;
      const defaultCoverKey = process.env.DEFAULT_COVER_KEY as string;

      // 현재 프로필 사진이 기본 이미지가 아닐때 이전 프로필 사진을 s3 객체삭제 합니다.
      if (currentCoverKey !== defaultCoverKey) s3Delete(req, res, currentCoverKey as string);

      // 기본 프로필 이미지로 바꾸기 위해 user테이블을 업데이트 시켜준다.
      const result = await userRepo.updateCover(id as number, defaultCoverUrl, defaultCoverKey);

      if (result.affected === 0) {
        logger.info('기본 커버 이미지로 변경 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '기본 커버 이미지로 변경 실패하였습니다.' });
      }

      logger.info('기본 커버 이미지로 변경 성공하였습니다.');
      return res
        .status(200)
        .json({ ok: true, message: '기본 커버 이미지로 변경 성공하였습니다.', defaultCoverUrl, defaultCoverKey });
    } catch (err: any) {
      logger.error('기본 프로필 사진 변경 에러', err);
      return res.status(500).json({ ok: false, message: '기본 커버 이미지 변경 에러' });
    }
  },

  // 계정탈퇴를 위해 유저의 모든 정보를 삭제하는 API입니다.
  delAccount: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    const drawingRepo = getCustomRepository(DrawingRepository);
    const imageKeysRepo = getCustomRepository(ImageKeyRepository);
    try {
      const id = req.session.user?.id;

      const user = await userRepo.findUserById(id as number);
      const drawings = await drawingRepo.findDrawingById(id as number);
      const imageKeys = await imageKeysRepo.findImageKeysById(id as number);

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

      // onDelete: cascade 때문에 관계된 모든 유저정보를 삭제합니다.
      const result = await userRepo.deleteUser(id as number);

      if (result.affected === 0) {
        logger.warn('계정 삭제 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '계정 삭제 실패하였습니다.' });
      }

      // 레디스에 저장된 대화정보 등등 식제
      await cluster.del(`chats:${user?.chatId}`);
      await cluster.del(`messages:${user?.chatId}`);
      await cluster.del(`msgNotis:${user?.chatId}`);

      req.session.destroy((err: any) => {
        if (err) {
          logger.warn('로그아웃시 세션제거 과정 중 에러 발생');
          return res.status(400).json({ ok: false, message: '로그아웃이 되지 않습니다.' });
        }
      });

      logger.info('계정 삭제 성공 하였습니다.');
      return res.status(200).clearCookie('sid').json({ ok: true, message: '계정이 정상적으로 삭제되었습니다.' });
    } catch (err: any) {
      logger.error('계정탈퇴 에러', err);
      return res.status(500).json({ ok: false, message: '계정탈퇴 에러' });
    }
  },

  // 이메일 변경을 위해 이메일 인증메일을 확인하는 API입니다.
  verifyEmail: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      // 쿼리스트링 파싱
      const { newEmail } = req.query;
      const id = req.session.user?.id;

      await userRepo.updateEmail(id as number, newEmail as string);

      /*
       * 재 로그인을 위해서 홈페이지로 이동합니다.
       * 재 로그인을 하기 때문에 굳이 API에서 세션을 변경하지 않습니다.
       */
      return res.status(200).redirect(process.env.CLIENT_ADDR as string);
    } catch (err: any) {
      logger.error('이메일 변경 인증 확인 에러', err);
      return res.status(500).json({ ok: false, message: '이메일 변경 인증 확인 에러' });
    }
  },

  // 자기소개(description)를 변경하는 API입니다.
  editDesc: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      const { desc } = req.body;
      const id = req.session.user?.id;

      // 자기소개에 아무것도 입력하지 않고 수정버튼을 눌렀을때
      if (!desc.length) {
        logger.info('자기소개 변경 글자가 없습니다.');
        return res.status(400).json({ ok: false, message: '자기소개를 입력해주세요.' });
      }

      // 자기소개에 입력한 글자가 너무 많을때
      if (desc.length > 5000) {
        logger.info('자기소개 변경 글자가 너무 많습니다.');
        return res.status(400).json({ ok: false, message: '자기소개가 너무 길어서 등록이 안되었습니다.' });
      }

      // 변경한 자기소개를 desc테이블에 업데이트합니다.
      const result = await userRepo.updateDesc(id as number, desc as string);
      if (result.affected === 0) {
        logger.info('자기소개 변경 실패하였습니다..');
        return res.status(400).json({ ok: false, message: '자기소개 변경 실패하였습니다.' });
      }

      logger.info('자기소개 변경 완료되었습니다.');
      return res.status(200).json({ ok: true, message: '자기소개 변경 완료되었습니다.', desc });
    } catch (err: any) {
      logger.error('자기소개 변경 에러', err);
      return res.status(500).json({ ok: false, message: '자기소개 변경 에러' });
    }
  },
};

export default settingsController;
