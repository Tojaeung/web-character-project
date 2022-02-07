import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';

interface MessageType {
  type: string;
  to: string;
  from: string;
  content: string;
  date: string;
}

const addMessage = async (socket: SessionSocket, message: MessageType, cb: Function) => {
  const user = socket.request.session.user;

  const messageStr = [message.type, message.to, message.from, message.content, message.date].join(',');

  await redisClient.rpush(`messages:${message.from}`, messageStr);
  await redisClient.rpush(`messages:${message.to}`, messageStr);

  // 대화상대는 메세지를 받을때 나를 친구목록에 추가한다.
  const chats = await redisClient.lrange(`chats:${message.to}`, 0, -1);

  const existingChat = chats.filter((chat) => chat === message.from);
  if (existingChat.length > 0) {
    cb({ ok: false, errorMessage: '이미 대화상대가 존재합니다.' });
    return;
  }

  await redisClient.lpush(`chats:${message.to}`, message.from);

  const newChat = {
    id: user.id,
    nickname: user.nickname,
    avatar: user.avatar,
  };

  socket.to(message.to).emit('addChat', newChat);

  const newMessage = {
    type: message.type,
    to: message.to,
    from: message.from,
    content: message.content,
    date: message.date,
  };

  socket.emit('addMessage', newMessage);
  socket.to(message.to).emit('addMessage', newMessage);
};

export default addMessage;
