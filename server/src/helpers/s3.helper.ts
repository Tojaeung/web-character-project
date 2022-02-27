import S3 from 'aws-sdk/clients/s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 } from 'uuid';
import mime from 'mime-types';
import logger from './winston.helper';

const bucketName = process.env.AWS_BUCKET_NAME as string;
const region = process.env.AWS_BUCKET_REGION as string;
const accessKeyId = process.env.AWS_ACCESS_KEY as string;
const secretAccessKey = process.env.AWS_SECRET_KEY as string;

export const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const chatUpload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      return cb(null, true);
    } else {
      logger.error('유효한 이미지파일 확장자가 아닙니다.');
      return cb(null, false);
    }
  },
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: bucketName,
    key: (req, file, cb) => {
      cb(null, `chat/${v4()}.${mime.extension(file.mimetype)}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export const avatarUpload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      return cb(null, true);
    } else {
      logger.error('유효한 이미지파일 확장자가 아닙니다.');
      return cb(null, false);
    }
  },
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: bucketName,
    key: (req, file, cb) => {
      cb(null, `avatar/${v4()}.${mime.extension(file.mimetype)}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export const coverUpload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      return cb(null, true);
    } else {
      logger.error('유효한 이미지파일 확장자가 아닙니다.');
      return cb(null, false);
    }
  },
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: bucketName,
    key: (req, file, cb) => {
      cb(null, `cover/${v4()}.${mime.extension(file.mimetype)}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
