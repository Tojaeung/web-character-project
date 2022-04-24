import { Request, Response, NextFunction } from 'express';
import ApiError from '@src/errors/api.error';
import logger from '@src/helpers/winston.helper';

const apiErrorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ ok: false, message: err.message });
  }

  logger.error('500 에러 발생', err);
  return res.status(500).json({ ok: false, message: '에러 발생..' });
};

export default apiErrorHandler;
