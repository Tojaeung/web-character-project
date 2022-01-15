import { createClient } from 'redis';
import logger from './winston.helper';

const redisClient = createClient();

redisClient.on('connect', () => {
  logger.info('redis 연결');
});

redisClient.on('error', () => {
  logger.error('redis 연결실패');
});

export default redisClient;
