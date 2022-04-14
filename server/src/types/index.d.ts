import { SessionData } from 'express-session';
import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';

declare module 'express-session' {
  interface SessionData {
    user: {
      [key: string]: any;
      id: number;
      chatId: string;
      email: string;
      nickname: string;
      desc: string;
      avatar: string;
      avatarKey: string;
      cover: string;
      coverKey: string;
      role: string;
      emailToken: string | null;
      isVerified: boolean;
      exp: number;
      created_at: Date;
      updated_at: Date;
    };
  }
}

interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData;
}

export interface SessionSocket extends Socket {
  request: SessionIncomingMessage;
}
