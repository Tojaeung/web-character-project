import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import ApiError from '@errors/api.error';
import logger from '@helpers/winston.helper';

const apiErrorHandler: ErrorRequestHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ ok: false, message: err.message, status: err.status });
  }

  logger.error('500 에러 발생', err);
  return res.status(500).json({ ok: false, message: '에러 발생..', err });
};

export default apiErrorHandler;
