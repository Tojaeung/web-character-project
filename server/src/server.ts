import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import helmet from 'helmet';

import ormconfig from '@configs/orm.config';
import corsConfig from '@configs/cors.config';
import logger, { stream } from '@helpers/winston.helper';

import { sessionConfig, wrapper } from '@configs/session.config';
import { authorizeUser } from '@middlewares/socket.middleware';
import socket from './socket';

import router from '@routes/index';
import apiErrorHandler from '@errors/apiHandler.error';

const app = express();
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

// Route
app.use('/api', router);
app.use(apiErrorHandler);

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
