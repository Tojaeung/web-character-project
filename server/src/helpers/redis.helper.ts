import Redis from 'ioredis';
import logger from './winston.helper';
import dotenv from 'dotenv';
dotenv.config();

const redisClient = new Redis({
  port: 6379,
  host: 'localhost',
  db: 0,
});

redisClient.on('connect', () => {
  logger.info('redis 연결');
});

redisClient.on('error', () => {
  logger.error('redis 연결실패');
});

export default redisClient;
