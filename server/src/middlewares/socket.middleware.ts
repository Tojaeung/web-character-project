import { NextFunction } from 'express';
import { SessionSocket } from '@src/types';
import logger from '@src/helpers/winston.helper';
import { Socket } from 'socket.io';
import redisClient from '@src/helpers/redis.helper';

export const authorizeUser = async (defaultSocket: Socket, next: NextFunction) => {
  const socket = <SessionSocket>defaultSocket;
  if (!socket.request.session.user) {
    logger.info('소켓에 세션정보가 없습니다. 로그인이 필요합니다.');
    return;
  }

  const user = socket.request.session.user;
  const userInfo = await redisClient.hgetall(`user:${user.nickname}`);

  if (!userInfo) {
    await redisClient.hset(`user:${user.nickname}`, 'user', user.nickname, 'avatar', user.avatar);
  }

  socket.join(user.nickname);

  next();
};
