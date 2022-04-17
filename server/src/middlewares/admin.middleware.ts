import { Request, Response, NextFunction } from 'express';
import logger from '@src/helpers/winston.helper';

const admin = (req: Request, res: Response, next: NextFunction) => {
  const isAdmin = req.headers['admin'];

  if (isAdmin !== 'ok') {
    logger.warn('관리자 권한이 없는 유저가 권한을 사용하려고 합니다.');
    return res.status(400).json({ ok: false, message: '관리자 권한이 없습니다.' });
  }
  next();
};

export default admin;
