import { NextFunction } from 'express';
import { SessionSocket } from '@src/types';
import logger from '@src/helpers/winston.helper';
import { Socket } from 'socket.io';

export const authorizeUser = async (defaultSocket: Socket, next: NextFunction) => {
  const socket = <SessionSocket>defaultSocket;
  if (!socket.request.session.user) {
    logger.info('소켓에 세션정보가 없습니다. 로그인이 필요합니다.');
    return;
  }

  const user = socket.request.session.user;

  socket.join(user.chatId);

  next();
};
