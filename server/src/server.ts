import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import ormconfig from '@src/config/ormconfig';
import logger, { stream } from '@src/helpers/winston.helper';
import redisClient from '@src/helpers/redis.helper';
import { avatarUpload, s3 } from '@src/helpers/s3.helper';

import authRouter from '@src/routes/auth.route';

const app: Application = express();

const combined =
  ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'tiny' : combined, { stream }));

app.use(cors({ origin: process.env.CLIENT_ADDR, credentials: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', authRouter);

// app.post('/', avatarUpload.single('avatar'), async (req: Request, res: Response) => {
//   const file = req.file;
//   console.log(file);
//   return res.json({ file });
// });

// app.delete('/', async (req: Request, res: Response) => {
//   const response = await s3
//     .deleteObject({
//       Bucket: 'character-project',
//       Key: 'avatar/34c719df-10e5-4af5-8de0-4940e3df49ca.jpeg',
//     })
//     .promise();
//   console.log(response);
// });

const port = process.env.PORT as string;
app.listen(port, async () => {
  logger.info(`${port}포트 연결!!`);
  createConnection(ormconfig)
    .then(() => {
      logger.info('pg 연결 !!');
    })
    .catch((err: any) => {
      logger.error('pg 연결실패 !!', err);
    });
  await redisClient.connect();
});
