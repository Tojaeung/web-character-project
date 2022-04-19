import { Request, Response, NextFunction } from 'express';
import logger from '@src/helpers/winston.helper';

const admin = (req: Request, res: Response, next: NextFunction) => {
  const role = req.session.user?.role;
  if (role !== 'admin') {
    logger.info('관리자 권한이 없는 계정이 관리자 권한을 사용하려고 합니다.');
    return res.status(400).json({ ok: false, message: '관리자 권한이 없습니다.' });
  }

  next();
};

export default admin;
