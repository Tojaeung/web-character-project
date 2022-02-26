import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository, FollowRepository, DescRepository } from '@src/repositorys/profile.repository';
import logger from '@src/helpers/winston.helper';
import cluster from '@src/helpers/redis.helper';
import getLevel from '@src/utils/exp.util';

const profileController = {
  /*
   * 프로필유저 정보를 클라이언트에 보내는 API입니다.
   * desc(자기소개), follower, following 테이블이 user테이블과 결합됩니다.
   */
  getProfile: async (req: Request, res: Response) => {
    const userRepository = getCustomRepository(UserRepository);
    const descRepository = getCustomRepository(DescRepository);
    const followRepository = getCustomRepository(FollowRepository);

    try {
      const { profileId } = req.body;
      const { id } = req.session.user!;

      // 프로필id와 유저id가 같다면(=본인 프로필 조회) 세션 유저정보를 활용한다.
      if (id === profileId) {
        // 자기소개를 가져옵니다.
        const desc = await descRepository.findDescByid(Number(id));
        console.log(desc);

        // 유저를 팔로우 한 사람 수를 가져옵니다.
        const followerNum = await followRepository.getFollowerNum(Number(id));
        console.log(followerNum);

        // 유저가 팔로우 한 사람 수를 가져옵니다.
        const followeeNum = await followRepository.getFolloweeNum(Number(id));
        console.log(followeeNum);

        // exp(경험치)를 레벨로 리턴하는 함수입니다.
        const exp = await cluster.zscore('exp', id);
        const level = await getLevel(Number(exp));

        const profile = {
          id: req.session.user?.id,
          email: req.session.user?.email,
          nickname: req.session.user?.nickname,
          avatar: req.session.user?.avatar,
          level,
          desc: desc?.content,
          followerNum: followerNum.count,
          followeeNum: followeeNum.count,
        };
        return res.status(200).json({ ok: true, message: '프로필 유저를 가져왔습니다.', profile });
      }

      // 다른유저의 프로필을 조회한다면 유저의 정보를 db를 통해 찾는다.
      const user = await userRepository.findUserById(Number(profileId));

      if (!user) {
        logger.warn('url를 이용해서 존재하지 않는 profileId에 접근하고 있습니다.');
        return res.status(400).json({ ok: false, message: '프로필 유저가 존재하지 않습니다.' });
      }

      // 자기소개를 가져옵니다.
      const desc = await descRepository.findDescByid(Number(profileId));

      // 내가 팔로우 했던 사람이였는지 확인합니다.
      const isFollowing = await followRepository.isFollowing(Number(id), Number(profileId));
      console.log({ isFollowing });

      // 유저를 팔로우 한 사람 수를 가져옵니다.
      const followerNum = await followRepository.getFollowerNum(Number(profileId));
      console.log(followerNum);

      // 유저가 팔로우 한 사람 수를 가져옵니다.
      const followeeNum = await followRepository.getFolloweeNum(Number(profileId));
      console.log(followeeNum);

      // exp(경험치)를 레벨로 리턴하는 함수입니다.
      const exp = await cluster.zscore('exp', profileId);
      const level = await getLevel(Number(exp));

      const profile = {
        id: user?.id,
        email: user?.email,
        nickname: user?.nickname,
        avatar: user?.avatar,
        level,
        desc: desc?.content,
        isFollowing: isFollowing ? true : false,
        followerNum: followerNum.count,
        followeeNum: followeeNum.count,
      };

      return res.status(200).json({ ok: true, message: '프로필 유저를 가져왔습니다.', profile });
    } catch (err: any) {
      logger.error('프로필 유저 가져오기 에러', err);
      return res.status(500).json({ ok: false, message: '프로필 유저 가져오기 에러' });
    }
  },

  // 상대를 follower, following 테이블에 추가하기 위한 API입니다.
  follow: async (req: Request, res: Response) => {
    const userRepository = getCustomRepository(UserRepository);
    const followRepository = getCustomRepository(FollowRepository);

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
      await followRepository.follow(Number(id), profileId);

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
    const followRepository = getCustomRepository(FollowRepository);

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
      await followRepository.unFollow(Number(id), profileId);

      logger.info(`${profileUser?.nickname}님을 언팔로우 하였습니다.`);
      return res.status(200).json({ ok: true, message: `${profileUser?.nickname}님을 언팔로우 하였습니다.` });
    } catch (err: any) {
      logger.error('언팔로우 에러', err);
      return res.status(500).json({ ok: false, message: '언팔로우 에러' });
    }
  },
};

export default profileController;
