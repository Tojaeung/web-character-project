import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import User from '@entities/profile/user.entity';
import Penalty from '@entities/penalty/penalty.entity';
import logger from '@helpers/winston.helper';
import ApiError from '@errors/api.error';
import { getRepository } from 'typeorm';

const penalty = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.session.user?.id as number;
  const isPenalty = req.session.user?.isPenalty;

  // 불량유저가 아니면 통과
  if (!isPenalty) return next();

  const penalty = await getRepository(Penalty).findOne({ userId: id });

  const currentDate = moment().format();
  const expiredDate = penalty?.expired_at;

  // 현재날짜가 만료일날짜 이후라면, 제재기간이 지난것이다.
  const isExpiredUser = moment(currentDate).isAfter(expiredDate);
  if (!isExpiredUser) {
    logger.warn(`${id}님은 일시적으로 서비스 이용에 제한을 받는 불량유저입니다.`);
    return res.status(403).json({
      ok: false,
      message: `일시적으로 서비스 이용에 제한을 받는 불량유저입니다.\n제재만료: ${moment(expiredDate).format(
        'YYYY-MM-DD hh:mm:ss'
      )}`,
    });

    // throw ApiError.Forbbiden(
    //   `일시적으로 서비스 이용에 제한을 받는 불량유저입니다.\n제재만료: ${moment(expiredDate).format(
    //     'YYYY-MM-DD hh:mm:ss'
    //   )}`
    // );
  }

  await getRepository(Penalty).delete({ userId: id });
  await getRepository(User).update(id, { isPenalty: false });
  req.session.user!.isPenalty = false;
  req.session.save(() => {
    next();
  });
};

export default penalty;
