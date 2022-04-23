import { Request, Response, NextFunction } from 'express';
import logger from '@src/helpers/winston.helper';
import ApiError from '@src/errors/api.error';

const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    logger.warn('세션정보 없는 유저가 서비스 이용을 시도합니다.');
    throw ApiError.Unauthorized('로그인 후 이용 가능합니다.');
  }
  next();
};

export default auth;
