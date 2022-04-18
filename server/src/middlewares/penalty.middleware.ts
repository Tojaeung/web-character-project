import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@src/repositorys/user.repository';
import logger from '@src/helpers/winston.helper';

const penalty = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.session.user?.id;

  const penalty = req.headers['penalty'];
  console.log({ penalty });

  if (!penalty) return next();

  const penaltyObj = JSON.parse(penalty as string);

  const today = moment().format('YYYY-MM-DD LT');
  const penaltyStartDate = penaltyObj.startDate;
  const penaltyExpireDate = penaltyObj.expireDate;

  // true: 패널티 만료되지 않음 , false: 패널티 만료됨
  const isStillPenalty = moment(penaltyExpireDate).isAfter(today);

  if (isStillPenalty) {
    logger.info(`만료되지 않은 유저(id:${id})가 서비스이용을 시도하고 있습니다.`);
    return res.status(400).json({
      ok: false,
      message: `이 계정은 불량유저 입니다.\n ${penaltyStartDate}~${penaltyExpireDate}까지 서비스 이용이 제한됩니다.`,
    });
  }

  const userRepo = getCustomRepository(UserRepository);
  await userRepo.updateExp(Number(id), 0);
  logger.info(`패널티 만료 처리가 정상적으로 이루어졌습니다.(id:${id})`);
  next();
};

export default penalty;
