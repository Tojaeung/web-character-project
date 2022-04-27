import { s3 } from '@src/helpers/s3.helper';
import logger from '@src/helpers/winston.helper';
import ApiError from '@src/errors/api.error';

export const s3Delete = (key: string) => {
  const bucketName = process.env.AWS_BUCKET_NAME as string;
  s3.deleteObject({ Bucket: bucketName, Key: key }, (err) => {
    if (err) {
      logger.error('s3 아바타 객체삭제를 실패하였습니다.');
      throw ApiError.InternalServerError('내부적인 문제로 s3 최적화 실패하였습니다.');
    }
  });
};
