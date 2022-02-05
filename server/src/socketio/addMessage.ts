import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';

interface MsgObjType {
  type: string;
  to: string;
  from: string | null;
  content: string;
  date: string;
}

const addMessage = async (socket: SessionSocket, msgObj: MsgObjType, cb: Function) => {
  const user = socket.request.session.user;

  const msgObjStr = [msgObj.type, msgObj.to, msgObj.from, msgObj.content, msgObj.date].join(',');

  await redisClient.rpush(`messages:${msgObj.from}`, msgObjStr);
  await redisClient.rpush(`messages:${msgObj.to}`, msgObjStr);

  const chatList = await redisClient.lrange(`chats:${msgObj.to}`, 0, -1);
  const newChat = { nickname: user.nickname, avatar: user.avatar };
  const newChatStr = [newChat.nickname, newChat.avatar].join(',');

  const existingChat = chatList.filter((chat) => chat === newChatStr);
  if (existingChat.length === 0) {
    await redisClient.lpush(`chats:${msgObj.to}`, newChatStr);
    socket.to(msgObj.to).emit('addChat', newChat);
    return;
  }

  socket.emit('addMessage', msgObj);
  socket.to(msgObj.to).emit('addMessage', msgObj);
};

export default addMessage;
