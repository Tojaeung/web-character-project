import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { UserRepository, FollowRepository } from '@src/repositorys/user.repository';
import logger from '@src/helpers/winston.helper';
import { Follow } from '@src/entities/user/follow.entity';

const profileController = {
  /*
   * 프로필유저 정보를 클라이언트에 보내는 API입니다.
   * follow 테이블이 user테이블과 결합됩니다.
   */
  getProfile: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);

    try {
      const { profileId } = req.body;

      const profile = await userRepo.findProfile(profileId);

      if (!profile) {
        logger.warn('url를 이용해서 존재하지 않는 profileId에 접근하고 있습니다.');
        return res.status(400).json({ ok: false, message: '프로필 유저가 존재하지 않습니다.' });
      }

      logger.info('프로필 유저 정보를 가져왔습니다.');
      return res.status(200).json({ ok: true, message: '프로필 유저를 가져왔습니다.', profile });
    } catch (err: any) {
      logger.error('프로필 유저 가져오기 에러', err);
      return res.status(500).json({ ok: false, message: '프로필 유저 가져오기 에러' });
    }
  },

  // 상대를 팔로우하기 위한 API입니다.
  follow: async (req: Request, res: Response) => {
    try {
      const { profileId, profileNickname } = req.body;
      const userId = req.session.user?.id!;

      // 상대를 팔로우 한다.
      const newFollower = new Follow();
      newFollower.from_id = userId;
      newFollower.to_id = profileId;
      await getRepository(Follow).save(newFollower);

      logger.info(`${profileNickname}님을 팔로우 하였습니다.`);
      return res.status(200).json({ ok: true, message: `${profileNickname}님을 팔로우 하였습니다.`, newFollower });
    } catch (err: any) {
      logger.error('팔로우 에러', err);
      return res.status(500).json({ ok: false, message: '팔로우 에러' });
    }
  },

  // 상대를 언팔로우 하기 위한 API입니다.
  unFollow: async (req: Request, res: Response) => {
    const followRepo = getCustomRepository(FollowRepository);

    try {
      const { profileId, profileNickname } = req.body;
      const userId = req.session.user?.id!;

      // 상대를 언팔로우 한다.
      await followRepo.unFollow(userId as number, profileId);

      logger.info(`${profileNickname}님을 언팔로우 하였습니다.`);
      return res.status(200).json({ ok: true, message: `${profileNickname}님을 언팔로우 하였습니다.`, userId });
    } catch (err: any) {
      logger.error('언팔로우 에러', err);
      return res.status(500).json({ ok: false, message: '언팔로우 에러' });
    }
  },
};

export default profileController;
