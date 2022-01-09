import cors from 'cors';
dotenv.config();
import express, { Application } from 'express';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import path from 'path';

import authRouter from '@src/routes/auth.route';

const app: Application = express();

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', authRouter);
app.use('/api');

createConnection({
  type: 'postgres',
  host: process.env.PG_HOST as string,
  port: 5432,
  username: process.env.PG_USERNAME as string,
  password: process.env.PG_PASSWORD as string,
  database: process.env.PG_DATABASE as string,
  entities: [],
  synchronize: true,
})
  .then(() => {
    console.log('pg 연결 !!');
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT as string;
app.listen(port, () => {
  console.log(`${port}포트 연결 !!`);
});
