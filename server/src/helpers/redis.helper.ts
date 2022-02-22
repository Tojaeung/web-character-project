import Redis from 'ioredis';
import logger from './winston.helper';
import dotenv from 'dotenv';
dotenv.config();

const cluster = new Redis.Cluster([
  { port: 7000, host: '127.0.0.1' },
  { port: 7001, host: '127.0.0.1' },
  { port: 7002, host: '127.0.0.1' },
  { port: 8000, host: '127.0.0.1' },
  { port: 8001, host: '127.0.0.1' },
  { port: 8002, host: '127.0.0.1' },
]);

cluster.on('connect', () => {
  logger.info('redis 연결');
});

cluster.on('error', () => {
  logger.error('redis 연결실패');
});

export default cluster;
