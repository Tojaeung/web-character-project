import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, { Application } from 'express';
import { createConnection } from 'typeorm';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import logger, { stream } from '@src/config/winston';

import redisClient from '@src/config/redis.config';

import authRouter from '@src/routes/auth.route';

const app: Application = express();

const combined =
  ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'tiny' : combined, { stream }));

// app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', authRouter);

const port = process.env.PORT as string;
app.listen(port, async () => {
  logger.info(`${port}포트 연결!!`);
  createConnection({
    type: 'postgres',
    host: process.env.PG_HOST as string,
    port: 5432,
    username: process.env.PG_USERNAME as string,
    password: process.env.PG_PASSWORD as string,
    database: process.env.PG_DATABASE as string,
    entities: ['src/entity/**/*.ts'],
    synchronize: true,
  })
    .then(() => {
      logger.info('pg 연결 !!');
    })
    .catch((err: any) => {
      logger.error('pg 연결실패 !!', err.message);
    });
  await redisClient.connect();
});
