import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { UserRepository } from '@src/repositorys/user.repository';
import logger from '@src/helpers/winston.helper';

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
        return res.status(400).json({ ok: false, message: '유저가 존재하지 않습니다.' });
      }

      logger.info('프로필 유저 정보를 가져왔습니다.');
      return res.status(200).json({ ok: true, message: '프로필 유저를 가져왔습니다.', profile });
    } catch (err: any) {
      logger.error('프로필 유저 가져오기 에러', err);
      return res.status(500).json({ ok: false, message: '유저 가져오기 에러' });
    }
  },
};

export default profileController;
