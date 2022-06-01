import Redis from 'ioredis';
import logger from './winston.helper';
import 'dotenv/config';

const redis = new Redis(Number(process.env.REDIS_PORT), process.env.REDIS_HOST);

redis?.on('connect', () => {
  logger.info('redis 연결');
});

redis?.on('error', () => {
  logger.error('redis 연결실패');
});
export default redis;
