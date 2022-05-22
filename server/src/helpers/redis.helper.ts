import Redis, { Cluster } from 'ioredis';
import logger from './winston.helper';
import dotenv from 'dotenv';
dotenv.config();

let cluster: Cluster;
if (process.env.NODE_ENV === 'development') {
  cluster = new Redis.Cluster([
    { port: Number(process.env.REDIS_CLUSTER_MASTER_PORT1), host: process.env.REDIS_CLUSTER_HOST },
    { port: Number(process.env.REDIS_CLUSTER_MASTER_PORT2), host: process.env.REDIS_CLUSTER_HOST },
    { port: Number(process.env.REDIS_CLUSTER_MASTER_PORT3), host: process.env.REDIS_CLUSTER_HOST },
    { port: Number(process.env.REDIS_CLUSTER_SLAVE_PORT1), host: process.env.REDIS_CLUSTER_HOST },
    { port: Number(process.env.REDIS_CLUSTER_SLAVE_PORT2), host: process.env.REDIS_CLUSTER_HOST },
    { port: Number(process.env.REDIS_CLUSTER_SLAVE_PORT3), host: process.env.REDIS_CLUSTER_HOST },
  ]);
} else {
  cluster = new Redis.Cluster([
    { port: Number(process.env.AWS_REDIS_CLUSTER_PORT), host: process.env.AWS_REDIS_CLUSTER_HOST },
  ]);
}

cluster?.on('connect', () => {
  logger.info('redis 연결');
});

cluster?.on('error', () => {
  logger.error('redis 연결실패');
});
export default cluster;
