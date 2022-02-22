import { Request, Response } from 'express';
import { User } from '@src/entities/user.entity';
import logger from '@src/helpers/winston.helper';
import bcrypt from 'bcrypt';
import { sendChangeEmail } from '@src/helpers/nodemailer.helper';
import { s3 } from '@src/helpers/s3.helper';

const settingsController = {
  editEmail: async (req: Request, res: Response) => {
    try {
      const newEmail = req.body.email;
      const currentEmail = req.session.user?.email;

      // 변경할 이메일이 존재하는지 확인합니다.
      const existingEmail = await User.findOne({ email: newEmail });
      if (existingEmail) {
        return res.status(200).json({ ok: false, message: '이미 존재하는 이메일 입니다.' });
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

  editNickname: async (req: Request, res: Response) => {
    try {
      const newNickname = req.body.nickname;
      const currentNickname = req.session.user?.nickname;

      // 변경할 닉네임이 존재하는지 확인합니다.
      const existingUser = await User.findOne({ nickname: newNickname });
      if (existingUser) return res.status(200).json({ ok: false, message: '이미 존재하는 닉네임 입니다.' });

      const user = await User.findOne({ nickname: currentNickname });
      user!.nickname = newNickname;
      user?.save();

      // 재 로그인을 하지 않고 세션을 변경 해줍니다.
      req.session.user!.nickname = newNickname;

      return res.status(200).json({ ok: true, message: '닉네임이 변경되었습니다.' });
    } catch (err) {
      logger.error('닉네임 변경 에러', err);
      return res.status(500).json({ ok: false, message: '닉네임 변경 에러' });
    }
  },

  editPw: async (req: Request, res: Response) => {
    try {
      const { currentPw, newPw } = req.body;
      const userId = req.session.user?.id;

      // 비밀번호 일치 확인
      const user = await User.findOne({ id: userId });
      const decryptedPw = await bcrypt.compare(currentPw, user?.pw as string);

      if (!decryptedPw) return res.status(200).json({ ok: false, message: '비밀번호가 틀렸습니다.' });

      // 일치하면 비밀번호 변경
      const encryptedPw = await bcrypt.hash(newPw, 8);
      user!.pw = encryptedPw;
      user?.save();

      return res.status(200).json({ ok: true, message: '비밀번호가 변경되었습니다. 다시 로그인 해주세요.' });
    } catch (err: any) {
      logger.error('비밀번호 변경 에러', err);
      return res.status(500).json({ ok: false, message: '비밀번호 변경 에러' });
    }
  },

  editAvatar: async (req: Request, res: Response) => {
    try {
      // s3 helper에서 받아온 file 속성
      const newAvatar = (req.file as Express.MulterS3.File).location;
      const newAvatarKey = (req.file as Express.MulterS3.File).key;

      const userId = req.session.user?.id;
      const currentAvatarKey = req.session.user?.avatarKey;
      const defaultAvatarKey = 'default-avatar.png';

      // s3 helper가 오류가 났을경우
      if (!newAvatar || !newAvatarKey) {
        logger.warn('s3에서 변경할 프로필 사진을 받아오지 못했습니다.');
        return res.status(400).json({ message: '변경할 프로필 사진을 찾지 못했습니다.' });
      }

      // 현재 아바타가 기본 아바타라면 삭제하지 않는다
      if (currentAvatarKey === defaultAvatarKey) {
        const user = await User.findOne({ id: userId });
        user!.avatar = newAvatar;
        user!.avatarKey = newAvatarKey;
        user?.save();

        // 재 로그인을 하지 않기 때문에 세션을 변경해줍니다.
        req.session.user!.avatar = newAvatar;
        req.session.user!.avatarKey = newAvatarKey;

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

      const user = await User.findOne({ id: userId });
      user!.avatar = newAvatar;
      user!.avatarKey = newAvatarKey;
      user?.save();

      // 재 로그인을 하지 않기 때문에 세션을 변경해줍니다.
      req.session.user!.avatar = newAvatar;
      req.session.user!.avatarKey = newAvatarKey;

      return res.status(200).json({ ok: true, message: '프로필 사진을 변경하였습니다.' });
    } catch (err: any) {
      logger.error('프로필사진 변경 에러', err);
      return res.status(500).json({ ok: false, message: '프로필사진 변경 에러' });
    }
  },

  defaultAvatar: async (req: Request, res: Response) => {
    try {
      const userId = req.session.user?.id;
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

      const user = await User.findOne({ id: userId });
      user!.avatar = defaultAvatar;
      user!.avatarKey = defaultAvatarKey;
      user?.save();

      // 재 로그인 하지 않기 때문에 세션을 변경 해줍니다.
      req.session.user!.avatar = defaultAvatar;
      req.session.user!.avatarKey = defaultAvatarKey;

      return res.status(200).json({ ok: true, message: '기본 이미지로 변경되었습니다.' });
    } catch (err: any) {
      logger.error('기본 프로필 사진 변경 에러', err);
      return res.status(500).json({ ok: false, message: '기본 프로필 사진 변경 에러' });
    }
  },

  delAccount: async (req: Request, res: Response) => {
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

      await User.delete({ id: id });

      return res.status(200).json({ ok: true, message: '계정이 정상적으로 삭제되었습니다.' });
    } catch (err: any) {
      logger.error('계정탈퇴 에러', err);
      return res.status(500).json({ ok: false, message: '계정탈퇴 에러' });
    }
  },

  verifyEmail: async (req: Request, res: Response) => {
    try {
      // 쿼리스트링 파싱
      const { newEmail, currentEmail } = req.query;

      const user = await User.findOne({ email: currentEmail as string });

      user!.email = newEmail as string;
      user?.save();

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

  editDesc: async (req: Request, res: Response) => {
    try {
      const { content } = req.body;
      const userId = req.session.user?.id;

      if (content.length === 0) {
        logger.info('자기소개 변경 글자가 없습니다.');
        return res.status(200).json({ ok: false, message: '자기소개를 입력해주세요.' });
      }

      if (content.length > 1000) {
        logger.info('자기소개 변경 글자가 너무 많습니다.');
        return res.status(200).json({ ok: false, message: '자기소개가 너무 길어서 등록이 안되었습니다.' });
      }

      const user = await User.findOne({ id: userId });
      user!.description = content;
      user?.save();

      req.session.user!.description = content;

      logger.info('자기소개 변경 완료되었습니다.');
      return res.status(200).json({ ok: true, message: '자기소개 변경 완료되었습니다.' });
    } catch (err: any) {
      logger.error('자기소개 변경 에러', err);
      return res.status(500).json({ ok: false, message: '자기소개 변경 에러' });
    }
  },
};

export default settingsController;