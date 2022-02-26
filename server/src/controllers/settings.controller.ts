import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import logger from '@src/helpers/winston.helper';
import { sendChangeEmail } from '@src/helpers/nodemailer.helper';
import { s3 } from '@src/helpers/s3.helper';
import { UserRepository, AuthRepository, DescRepository, FollowRepository } from '@src/repositorys/profile.repository';
import cluster from '@src/helpers/redis.helper';

const settingsController = {
  // 이메일 변경을 위한 API입니다. (변경을 위해서 이메일 인증이 필요합니다.)
  editEmail: async (req: Request, res: Response) => {
    const userRepository = getCustomRepository(UserRepository);
    try {
      const newEmail = req.body.email;
      const currentEmail = req.session.user?.email;

      // 변경할 이메일이 존재하는지 확인합니다.
      const existingEmail = await userRepository.findUserByEmail(newEmail);
      if (existingEmail) {
        return res.status(200).json({ ok: false, message: '이미 존재하는 이메일 입니다.' });
      }

      /*
       * 이메일 변경 인증 메일을 발송합니다.
       * 인증확인은 verifyEmail API에서 처리됩니다.
       */
      await sendChangeEmail(req, res, newEmail, currentEmail);

      req.session.user!.email = newEmail;

      logger.info('이메일 변경 인증 메세지를 보냈습니다.');
      return res.status(200).json({ ok: true, message: '이메일 인증 메세지를 보냈습니다.' });
    } catch (err: any) {
      logger.error('이메일 변경 에러', err);
      return res.status(500).json({ ok: false, message: '이메일 변경 에러' });
    }
  },

  // 닉네임을 바꾸는 API입니다.
  editNickname: async (req: Request, res: Response) => {
    const userRepository = getCustomRepository(UserRepository);
    try {
      const newNickname = req.body.nickname;
      const id = req.session.user?.id;

      // 변경할 닉네임이 존재하는지 확인합니다.
      const existingNickname = await userRepository.findUserByNickname(newNickname);
      if (existingNickname) return res.status(200).json({ ok: false, message: '이미 존재하는 닉네임 입니다.' });

      await userRepository.updateNickname(Number(id), newNickname);

      // 재 로그인을 하지 않고 세션을 변경 해줍니다.
      req.session.user!.nickname = newNickname;

      return res.status(200).json({ ok: true, message: '닉네임이 변경되었습니다.' });
    } catch (err) {
      logger.error('닉네임 변경 에러', err);
      return res.status(500).json({ ok: false, message: '닉네임 변경 에러' });
    }
  },

  // 비밀번호를 변경하는 API 입니다.
  editPw: async (req: Request, res: Response) => {
    const userRepository = getCustomRepository(UserRepository);
    try {
      const { currentPw, newPw } = req.body;
      const id = req.session.user?.id;

      // 비밀번호 일치 확인
      const user = await userRepository.findUserById(Number(id));
      const decryptedPw = await bcrypt.compare(currentPw, user?.pw as string);
      if (!decryptedPw) return res.status(200).json({ ok: false, message: '비밀번호가 틀렸습니다.' });

      // 일치하면 비밀번호 변경
      const encryptedPw = await bcrypt.hash(newPw, 8);
      await userRepository.updatePw(Number(id), encryptedPw);

      return res.status(200).json({ ok: true, message: '비밀번호가 변경되었습니다. 다시 로그인 해주세요.' });
    } catch (err: any) {
      logger.error('비밀번호 변경 에러', err);
      return res.status(500).json({ ok: false, message: '비밀번호 변경 에러' });
    }
  },

  // 프로필 사진을 변경하는 API 입니다.
  editAvatar: async (req: Request, res: Response) => {
    const userRepository = getCustomRepository(UserRepository);
    try {
      // s3 helper에서 받아온 file 속성
      const newAvatar = (req.file as Express.MulterS3.File).location;
      const newAvatarKey = (req.file as Express.MulterS3.File).key;

      const id = req.session.user?.id;
      const currentAvatarKey = req.session.user?.avatarKey;
      const defaultAvatarKey = 'default-avatar.png';

      // s3 helper가 오류가 났을경우
      if (!newAvatar || !newAvatarKey) {
        logger.warn('s3에서 변경할 프로필 사진을 받아오지 못했습니다.');
        return res.status(400).json({ message: '변경할 프로필 사진을 찾지 못했습니다.' });
      }

      // 현재 아바타가 기본 아바타라면 삭제하지 않는다
      if (currentAvatarKey === defaultAvatarKey) {
        // 재 로그인을 하지 않기 때문에 세션을 변경해줍니다.
        req.session.user!.avatar = newAvatar;
        return res.status(200).json({ ok: true, message: '프로필 사진을 변경하였습니다.' });
      }

      // s3 최적화를 위해 현재 아바타가 기본 아바타가 아니라면 현재아바타를 삭제한다.
      const bucketName = process.env.AWS_BUCKET_NAME as string;
      s3.deleteObject({ Bucket: bucketName, Key: currentAvatarKey as string }, (err) => {
        if (err) {
          logger.warn('s3 아바타 객체삭제를 실패하였습니다.');
          return res.status(400).json({ ok: false, message: 's3 최적화 실패하였습니다.' });
        }
      });

      // user테이블에 avatar, avatarKey 정보를 업데이트 합니다.
      await userRepository.updateAvatar(Number(id), newAvatar, newAvatarKey);

      // 재 로그인을 하지 않기 때문에 세션을 변경해줍니다.
      req.session.user!.avatar = newAvatar;
      req.session.user!.avatarKey = newAvatarKey;

      return res.status(200).json({ ok: true, message: '프로필 사진을 변경하였습니다.' });
    } catch (err: any) {
      logger.error('프로필사진 변경 에러', err);
      return res.status(500).json({ ok: false, message: '프로필사진 변경 에러' });
    }
  },

  // 프로필이미지를 기본 이미지로 바꾸는 API입니다.
  defaultAvatar: async (req: Request, res: Response) => {
    const userRepository = getCustomRepository(UserRepository);
    try {
      const id = req.session.user?.id;
      const currentAvatarKey = req.session.user?.avatarKey;

      // 기본 프로필 사진 데이터입니다.
      const defaultAvatar = 'https://character.s3.ap-northeast-2.amazonaws.com/avatar/default-avatar.png';
      const defaultAvatarKey = 'default-avatar.png';

      // 이미 기본 이미지일때
      if (currentAvatarKey === defaultAvatarKey) {
        return res.status(200).json({ ok: false, message: '이미 기본 이미지입니다.' });
      }

      // 현재 프로필 사진이 기본 이미지가 아닐때 이전 프로필 사진을 s3 객체삭제 합니다.
      const bucketName = process.env.AWS_BUCKET_NAME as string;
      s3.deleteObject({ Bucket: bucketName, Key: currentAvatarKey as string }, (err) => {
        if (err) {
          logger.warn('s3 아바타 객체삭제를 실패하였습니다.');
          return res.status(400).json({ ok: false, message: '최적화 실패하였습니다.' });
        }
      });

      // 기본 프로필 이미지로 바꾸기 위해 user테이블을 업데이트 시켜준다.
      await userRepository.updateAvatar(Number(id), defaultAvatar, defaultAvatarKey);

      // 재 로그인 하지 않기 때문에 세션을 변경 해줍니다.
      req.session.user!.avatar = defaultAvatar;

      return res.status(200).json({ ok: true, message: '기본 이미지로 변경되었습니다.' });
    } catch (err: any) {
      logger.error('기본 프로필 사진 변경 에러', err);
      return res.status(500).json({ ok: false, message: '기본 프로필 사진 변경 에러' });
    }
  },

  // 계정탈퇴를 위해 유저의 모든 정보를 삭제하는 API입니다.
  delAccount: async (req: Request, res: Response) => {
    const userRepository = getCustomRepository(UserRepository);
    const authRepository = getCustomRepository(AuthRepository);
    const descRepository = getCustomRepository(DescRepository);
    const followRepository = getCustomRepository(FollowRepository);

    try {
      const id = req.session.user?.id;
      const currentAvatarKey = req.session.user?.avatarKey;
      const defaultAvatarKey = 'default-avatar.png';

      // 기본이미지 제외, 탈퇴한 계정의 프로필 사진을 s3에서 객체삭제 합니다.
      if (currentAvatarKey !== defaultAvatarKey) {
        const bucketName = process.env.AWS_BUCKET_NAME as string;
        s3.deleteObject({ Bucket: bucketName, Key: currentAvatarKey as string }, (err) => {
          if (err) {
            logger.warn('s3 아바타 객체삭제를 실패하였습니다.');
            return res.status(400).json({ ok: false, message: '최적화 실패하였습니다.' });
          }
        });
      }

      // 관련된 모든 유저정보를 삭제합니다.
      await userRepository.deleteUser(Number(id));
      await authRepository.deleteAuth(Number(id));
      await descRepository.deleteDesc(Number(id));
      await followRepository.deleteFollow(Number(id));

      // 레디스에 저장된 유저의 경험치 정보를 삭제합니다.
      await cluster.zrem('exp', id as string);

      // 레디스에 저장된 대화정보 등등 식제

      return res.status(200).json({ ok: true, message: '계정이 정상적으로 삭제되었습니다.' });
    } catch (err: any) {
      logger.error('계정탈퇴 에러', err);
      return res.status(500).json({ ok: false, message: '계정탈퇴 에러' });
    }
  },

  // 이메일 변경을 위해 이메일 인증메일을 확인하는 API입니다.
  verifyEmail: async (req: Request, res: Response) => {
    const userRepository = getCustomRepository(UserRepository);
    try {
      // 쿼리스트링 파싱
      const { newEmail } = req.query;
      const id = req.session.user?.id;

      await userRepository.updateEmail(Number(id), newEmail as string);

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
    const descRepository = getCustomRepository(DescRepository);
    try {
      const { content } = req.body;
      const id = req.session.user?.id;

      // 자기소개에 아무것도 입력하지 않고 수정버튼을 눌렀을때
      if (content.length === 0) {
        logger.info('자기소개 변경 글자가 없습니다.');
        return res.status(200).json({ ok: false, message: '자기소개를 입력해주세요.' });
      }

      // 자기소개에 입력한 글자가 너무 많을때
      if (content.length > 1000) {
        logger.info('자기소개 변경 글자가 너무 많습니다.');
        return res.status(200).json({ ok: false, message: '자기소개가 너무 길어서 등록이 안되었습니다.' });
      }

      // 변경한 자기소개를 desc테이블에 업데이트합니다.
      await descRepository.updateDesc(Number(id), content as string);

      logger.info('자기소개 변경 완료되었습니다.');
      return res.status(200).json({ ok: true, message: '자기소개 변경 완료되었습니다.' });
    } catch (err: any) {
      logger.error('자기소개 변경 에러', err);
      return res.status(500).json({ ok: false, message: '자기소개 변경 에러' });
    }
  },
};

export default settingsController;
