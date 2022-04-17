import { Request, Response, NextFunction } from 'express';
import logger from '@src/helpers/winston.helper';

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    logger.info('서비스 이용 세션인증 실패, 로그인이 필요합니다.');
    return res.status(400).json({ ok: false, message: '로그인 후 이용 가능합니다.' });
  }

  next();
};

export default auth;
