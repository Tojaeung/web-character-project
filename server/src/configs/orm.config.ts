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
  synchronize: (process.env.NODE_ENV as string) === 'production' ? false : true,
  logging: ['query', 'error'],
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default ormconfig;
