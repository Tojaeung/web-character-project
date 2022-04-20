export type ChatUserType = {
  chatId: string;
  nickname: string;
  avatar: string;
  lastType: string | null;
  lastMessage: string | null;
  lastDate: string | null;
};

export type MessageType = {
  type: string;
  to: string;
  from: string;
  content: string;
  imgKey: string;
  date: string;
};

export type MsgNotiType = {
  from: string;
  to: string;
};
