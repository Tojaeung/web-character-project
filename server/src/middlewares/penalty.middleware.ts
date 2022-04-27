import { Request, Response, NextFunction } from 'express';
import logger from '@src/helpers/winston.helper';
import ApiError from '@src/errors/api.error';

const penalty = (req: Request, res: Response, next: NextFunction) => {
  const exp = req.session.user?.exp;

  if (exp === null) {
    logger.warn('일시적으로 서비스 이용에 제한을 받는 불량유저입니다.');
    throw ApiError.Forbbiden(
      '불량유저입니다.\n서비스 이용에 일시적인 제한이 있습니다.\n자세한 내용은 알림을 참고해주세요.'
    );
  }

  next();
};

export default penalty;
