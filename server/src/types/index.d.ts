import { SessionData } from 'express-session';
import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';

declare module 'express-session' {
  interface SessionData {
    user: {
      [key: string]: any;
      id: string;
      email: string;
      nickname: string;
      bank: string;
      accountNumber: string;
      emailToken: string | null | undefined;
      avatar: string;
      avatarKey: string;
      level: number;
      isVerified: boolean;
    };
  }
}

interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData;
}

export interface SessionSocket extends Socket {
  request: SessionIncomingMessage;
}
