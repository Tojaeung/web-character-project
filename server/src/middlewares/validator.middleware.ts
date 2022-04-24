import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, z } from 'zod';
import logger from '@src/helpers/winston.helper';

const validator = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      logger.warn(err.issues[0]);
      return res.status(400).json({ ok: false, message: err.issues[0].message });
    }
  }
};

export default validator;
