export type ChatUserType = {
  userId: string;
  nickname: string;
  avatar: string;
  lastType: string | undefined;
  lastMessage: string | undefined;
  lastDate: string | undefined;
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
