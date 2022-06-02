import redis from '@helpers/redis.helper';
import session from 'express-session';
import 'dotenv/config';
import ConnectRedis from 'connect-redis';
import { Socket } from 'socket.io';
const RedisStore = ConnectRedis(session);

export const sessionConfig = session({
  secret: process.env.SESSION_SECRET as string,
  store: new RedisStore({ client: redis }),
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
});

export const wrapper = (sessionMiddleware: any) => (socket: Socket, next: any) => {
  sessionMiddleware(socket.request, {}, next);
};
