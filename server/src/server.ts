import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import helmet from 'helmet';

import ormconfig from '@src/configs/orm.config';
import corsConfig from '@src/configs/cors.config';
import logger, { stream } from '@src/helpers/winston.helper';

import { sessionConfig, wrapper } from '@src/configs/session.config';
import { authorizeUser } from '@src/middlewares/socket.middleware';
import socket from './socket';

import authRouter from '@src/routes/auth.route';
import chatRouter from '@src/routes/chat.route';
import settingsRouter from '@src/routes/settings.route';
import profileRouter from '@src/routes/profile.route';
import photoRouter from '@src/routes/photo.route';

const app: Application = express();
const http = createServer(app);
const io = new Server(http, { cors: corsConfig });

// Logging
const combined =
  ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'tiny' : combined, { stream }));

// Middlewares
app.use(cors(corsConfig));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sessionConfig);

// Socket.io Middlewares
io.use(wrapper(sessionConfig));
io.use((defaultSocket: Socket, next: any) => authorizeUser(defaultSocket, next));

// Routes
app.use('/api', authRouter);
app.use('/api', chatRouter);
app.use('/api', settingsRouter);
app.use('/api', profileRouter);
app.use('/api', photoRouter);

// Server & DB listening
const port = process.env.PORT as string;
http.listen(port, async () => {
  logger.info(`${port}포트 연결!!`);
  createConnection(ormconfig)
    .then(() => {
      logger.info('pg 연결 !!');
    })
    .catch((err: any) => {
      logger.error('pg 연결실패 !!', err);
    });
  await socket({ io });
});
