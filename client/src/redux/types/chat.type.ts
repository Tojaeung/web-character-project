export type ChatUserType = {
  userId: string;
  nickname: string;
  avatar: string;
};

export type MessageType = { type: string; to: string; from: string; content: string; date: string };

export type MsgNotiType = {
  from: string;
  to: string;
};
