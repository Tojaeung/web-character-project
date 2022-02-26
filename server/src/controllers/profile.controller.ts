import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository, FollowerRepository, FollowingRepository } from '@src/repositorys/profile.repository';
import logger from '@src/helpers/winston.helper';

const profileController = {
  /*
   * 프로필유저 정보를 클라이언트에 보내는 API입니다.
   * desc(자기소개), follower, following 테이블이 user테이블과 결합됩니다.
   */
  getProfileUser: async (req: Request, res: Response) => {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const { id } = req.body;

      // 프로필 유저가 존재하지 않으면 홈페이지로 이동한다.
      const profileUser = await userRepository.findUserById(id as number);
      if (!profileUser) {
        logger.info('프로필 유저가 존재하지 않습니다.');
        return res.status(200).redirect(process.env.CLIENT_ADDR as string);
      }

      // user테이블과 desc, follower, following 테이블들을 조인한다.
      const joinedProfileUser = await userRepository.getProfileUser(id as number);

      const profileUser2 = {
        id: joinedProfileUser?.id,
        email: joinedProfileUser?.email,
      };

      return res.status(200).json({ ok: true, message: '프로필 유저를 가져왔습니다.', joinedProfileUser });
    } catch (err: any) {
      logger.error('프로필 유저 가져오기 에러', err);
      return res.status(500).json({ ok: false, message: '프로필 유저 가져오기 에러' });
    }
  },

  // 상대를 follower, following 테이블에 추가하기 위한 API입니다.
  follow: async (req: Request, res: Response) => {
    const userRepository = getCustomRepository(UserRepository);
    const followerRepository = getCustomRepository(FollowerRepository);
    const followingRepository = getCustomRepository(FollowingRepository);

    try {
      const { profileId } = req.body;
      const id = req.session.user?.id;

      // 프로필 유저가 존재하는지 확인한다.
      const profileUser = await userRepository.findUserById(profileId);
      if (!profileUser) {
        logger.info('프로필 유저가 존재하지 않습니다.');
        return res.status(200).json({ ok: false, message: '유저가 존재 하지않습니다.' });
      }

      // follower, following 테이블에 나와 상대의 정보를 추가한다.
      await followerRepository.follow(Number(id), profileId);
      await followingRepository.follow(Number(id), profileId);

      logger.info(`${profileUser?.nickname}님을 팔로우 하였습니다.`);
      return res.status(200).json({ ok: true, message: `${profileUser?.nickname}님을 팔로우 하였습니다.` });
    } catch (err: any) {
      logger.error('팔로우 에러', err);
      return res.status(500).json({ ok: false, message: '팔로우 에러' });
    }
  },

  // 상대를 follower, following 테이블에 삭제하기 위한 API입니다.
  unFollow: async (req: Request, res: Response) => {
    const userRepository = getCustomRepository(UserRepository);
    const followerRepository = getCustomRepository(FollowerRepository);
    const followingRepository = getCustomRepository(FollowingRepository);

    try {
      const { profileId } = req.body;
      const id = req.session.user?.id;

      // 프로필 유저가 존재하는지 확인한다.
      const profileUser = await userRepository.findUserById(profileId);
      if (!profileUser) {
        logger.info('프로필 유저가 존재하지 않습니다.');
        return res.status(200).json({ ok: false, message: '유저가 존재 하지않습니다.' });
      }

      // follower, following 테이블에 나와 상대의 정보를 삭제한다.
      await followerRepository.unfollow(Number(id), profileId);
      await followingRepository.unfollow(Number(id), profileId);

      logger.info(`${profileUser?.nickname}님을 언팔로우 하였습니다.`);
      return res.status(200).json({ ok: true, message: `${profileUser?.nickname}님을 언팔로우 하였습니다.` });
    } catch (err: any) {
      logger.error('언팔로우 에러', err);
      return res.status(500).json({ ok: false, message: '언팔로우 에러' });
    }
  },
};

export default profileController;
