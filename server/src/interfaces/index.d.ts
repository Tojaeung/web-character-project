import { SessionData } from 'express-session';
import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';

declare module 'express-session' {
  interface SessionData {
    user: {
      [key: string]: any;
      id: number;
      chatId: string;
      role: string;
      isPenalty: boolean;
    };
  }
}

interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData;
}

export interface SessionSocket extends Socket {
  request: SessionIncomingMessage;
}
