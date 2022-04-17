import { Request, Response, NextFunction } from 'express';
import logger from '@src/helpers/winston.helper';

const penaltyUser = (req: Request, res: Response, next: NextFunction) => {
  const isPenaltyUser = req.headers['penalty_user'];

  if (isPenaltyUser === 'ok') {
    logger.warn('패널티를 받은 유저가 서비스 이용 시도를 하고 있습니다.');
    return res.status(400).json({ ok: false, message: '패널티를 받았습니다.' });
  }
  next();
};

export default penaltyUser;
