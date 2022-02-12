import { Request, Response } from 'express';
import { User } from '@src/entities/user.entity';
import logger from '@src/helpers/winston.helper';

const profileController = {
  getUser: async (req: Request, res: Response) => {
    try {
      const paramId = req.body.id;
      const user = await User.findOne({ id: paramId });

      // 프로필 유저가 존재하지 않으면 홈페이지로 이동한다.
      if (!user) {
        logger.info('프로필 유저가 존재하지 않습니다.');
        return res.status(200).redirect(process.env.CLIENT_ADDR as string);
      }

      delete user.pw;
      delete user.pwToken;

      return res.status(200).json({ ok: true, message: '프로필 유저를 가져왔습니다.', user });
    } catch (err: any) {
      logger.error('프로필 유저 가져오기 에러', err);
      return res.status(500).json({ ok: false, message: '프로필 유저 가져오기 에러' });
    }
  },

  follow: async (req: Request, res: Response) => {
    try {
      const { profileId } = req.body;
      const userId = req.session.user?.id;

      // 나의 팔로잉에 상대방 아이디 넣기
      const user = await User.findOne({ id: userId });
      user?.followings.push(profileId);
      user?.save();

      // 상대방 팔로우에 나의 아이디 넣기
      const profile = await User.findOne({ id: profileId });
      profile?.followers.push(userId as string);
      profile?.save();

      req.session.user!.following = user!.followings;

      logger.info(`${profile?.nickname}님을 팔로우 하였습니다.`);
      return res.status(200).json({ ok: true, message: `${profile?.nickname}님을 팔로우 하였습니다.` });
    } catch (err: any) {
      logger.error('팔로우 에러', err);
      return res.status(500).json({ ok: false, message: '팔로우 에러' });
    }
  },

  unFollow: async (req: Request, res: Response) => {
    try {
      const { profileId } = req.body;
      const userId = req.session.user?.id;

      // 나의 팔로잉에 상대방 아이디 삭제
      const user = await User.findOne({ id: userId });
      user?.followings.filter((following) => following !== userId);
      user?.save();

      // 상대방 팔로우에 나의 아이디 삭제
      const profile = await User.findOne({ id: profileId });
      profile?.followers.filter((follower) => follower !== userId);
      profile?.save();

      req.session.user!.following = user!.followings;

      logger.info(`${profile?.nickname}님을 언팔로우 하였습니다.`);
      return res.status(200).json({ ok: true, message: `${profile?.nickname}님을 언팔로우 하였습니다.` });
    } catch (err: any) {
      logger.error('언팔로우 에러', err);
      return res.status(500).json({ ok: false, message: '언팔로우 에러' });
    }
  },
};

export default profileController;
