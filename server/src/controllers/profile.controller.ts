import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository, FollowRepository } from '@src/repositorys/user.repository';
import logger from '@src/helpers/winston.helper';

const profileController = {
  /*
   * 프로필유저 정보를 클라이언트에 보내는 API입니다.
   * follow 테이블이 user테이블과 결합됩니다.
   */
  getProfile: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    const followRepo = getCustomRepository(FollowRepository);

    try {
      const { profileId } = req.body;
      const id = req.session.user?.id;

      /*
       * 다른유저의 프로필을 조회한다면 유저의 정보를 db를 통해 찾는다.
       * 클라이언트 url에서 유저 id를 직접입력해서 접근하는 경우를 대비합니다.
       */
      const profileUser = await userRepo.findUserById(profileId);
      if (!profileUser) {
        logger.warn('url를 이용해서 존재하지 않는 profileId에 접근하고 있습니다.');
        return res.status(400).json({ ok: false, message: '프로필 유저가 존재하지 않습니다.' });
      }

      // 내가 팔로우 했던 사람이였는지 확인합니다.
      const isFollowing = await followRepo.isFollowing(id as number, profileId);

      // 유저를 팔로우 한 사람 수를 가져옵니다.
      const followerNum = await followRepo.getFollowerNum(profileId);

      // 유저가 팔로우 한 사람 수를 가져옵니다.
      const followingNum = await followRepo.getFollowingNum(profileId);

      const profile = {
        id: profileUser?.id,
        userId: profileUser.userId,
        email: profileUser?.email,
        nickname: profileUser?.nickname,
        desc: profileUser.desc,
        avatar: profileUser?.avatar,
        cover: profileUser?.cover,
        role: profileUser?.role,
        exp: profileUser.exp,
        follow: isFollowing ? true : false,
        followerNum: followerNum.count,
        followingNum: followingNum.count,
        created_at: profileUser.created_at,
        updated_at: profileUser.updated_at,
      };

      logger.info('프로필 유저 정보를 가져왔습니다.');
      return res.status(200).json({ ok: true, message: '프로필 유저를 가져왔습니다.', profile });
    } catch (err: any) {
      logger.error('프로필 유저 가져오기 에러', err);
      return res.status(500).json({ ok: false, message: '프로필 유저 가져오기 에러' });
    }
  },

  // 상대를 팔로우하기 위한 API입니다.
  follow: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    const followRepo = getCustomRepository(FollowRepository);

    try {
      const { profileId } = req.body;
      const id = req.session.user?.id;

      // 프로필 유저의 정보를 가져온다.
      const profileUser = await userRepo.findUserById(profileId);

      // 상대를 팔로우 한다.
      await followRepo.follow(id as number, profileId);

      logger.info(`${profileUser?.nickname}님을 팔로우 하였습니다.`);
      return res.status(200).json({ ok: true, message: `${profileUser?.nickname}님을 팔로우 하였습니다.` });
    } catch (err: any) {
      logger.error('팔로우 에러', err);
      return res.status(500).json({ ok: false, message: '팔로우 에러' });
    }
  },

  // 상대를 언팔로우 하기 위한 API입니다.
  unFollow: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    const followRepo = getCustomRepository(FollowRepository);

    try {
      const { profileId } = req.body;
      const id = req.session.user?.id;

      // 프로필 유저의 정보를 가져온다.
      const profileUser = await userRepo.findUserById(profileId);

      // 상대를 언팔로우 한다.
      await followRepo.unFollow(id as number, profileId);

      logger.info(`${profileUser?.nickname}님을 언팔로우 하였습니다.`);
      return res.status(200).json({ ok: true, message: `${profileUser?.nickname}님을 언팔로우 하였습니다.` });
    } catch (err: any) {
      logger.error('언팔로우 에러', err);
      return res.status(500).json({ ok: false, message: '언팔로우 에러' });
    }
  },
};

export default profileController;
