import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST as string,
  port: 5432,
  username: process.env.PG_USERNAME as string,
  password: process.env.PG_PASSWORD as string,
  database: process.env.PG_DATABASE as string,
  entities: [`${__dirname}/../entities/**/*.ts`],
  synchronize: true,
};

export default ormconfig;
