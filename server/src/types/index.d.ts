import { SessionData } from 'express-session';
import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';

declare module 'express-session' {
  interface SessionData {
    user: {
      [key: string]: any;
      id: number;
      userId: string;
      email: string;
      nickname: string;
      avatar: string;
      avatarKey: string;
      cover: string;
      coverKey: string;
      role: string;
      emailToken: string | null;
      isVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
      level: number;
    };
  }
}

interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData;
}

export interface SessionSocket extends Socket {
  request: SessionIncomingMessage;
}
