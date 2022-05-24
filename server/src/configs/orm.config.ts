import { ConnectionOptions } from 'typeorm';
import 'dotenv/config';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST as string,
  port: 5432,
  username: process.env.PG_USERNAME as string,
  password: process.env.PG_PASSWORD as string,
  database: process.env.PG_DATABASE as string,
  synchronize: process.env.NODE_ENV === 'development',
  entities: [__dirname + '/../entities/**/*{.ts,.js}'],
  // logging: ['query', 'error'],
};

export default ormConfig;
