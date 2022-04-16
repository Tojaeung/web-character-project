import { Request, Response } from 'express';
import { s3 } from '@src/helpers/s3.helper';
import logger from '@src/helpers/winston.helper';

export const s3Delete = (req: Request, res: Response, key: string) => {
  const bucketName = process.env.AWS_BUCKET_NAME as string;
  s3.deleteObject({ Bucket: bucketName, Key: key }, (err) => {
    if (err) {
      logger.warn('s3 아바타 객체삭제를 실패하였습니다.');
      return res.status(400).json({ ok: false, message: 's3 최적화 실패하였습니다.' });
    }
  });
};
