import { Request, Response, NextFunction } from 'express';
import ApiError from '@src/errors/api.error';
import logger from '@src/helpers/winston.helper';

const apiErrorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  logger.error('500 에러 발생', err);
  res.status(500).json({ message: '에러 발생..' });
};

export default apiErrorHandler;
