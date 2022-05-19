import { getRepository } from 'typeorm';
import { SessionSocket } from '@src/types/index';
import cluster from '@src/helpers/redis.helper';
import User from '@src/entities/user/user.entity';

interface MessageType {
  type: string;
  to: string;
  from: string;
  content: string;
  imgKey?: string;
  date: string;
}

const addMessage = async (socket: SessionSocket, message: MessageType) => {
  const id = socket.request.session.user.id;

  const user = await getRepository(User).findOne({ id });

  // 메세지 객체를 스트링으로 바꿔준후 나와 대화상대 레디스에 저장한다.
  const messageStr = [message.type, message.to, message.from, message.content, message.imgKey, message.date].join(',');
  await cluster.rpush(`messages:${message.from}`, messageStr);
  await cluster.rpush(`messages:${message.to}`, messageStr);

  // 채팅상대는 메세지를 받을때 나를 친구목록에 추가한다.
  const chats = await cluster.lrange(`chats:${message.to}`, 0, -1);

  // 대화상대의 채팅상대에 내가 없다면 추가해준다.
  const existingChat = chats.some((chat) => chat === message.from);
  if (!existingChat) {
    await cluster.lpush(`chats:${message.to}`, message.from);

    const newChat = {
      chatId: user?.chatId,
      nickname: user?.nickname,
      avatar: user?.avatar,
    };

    const result = { ok: true, newChat };
    socket.to(message.to).emit('addChat', result);
  }

  const newMessage = {
    type: message.type,
    to: message.to,
    from: message.from,
    content: message.content,
    imgKey: message.imgKey,
    date: message.date,
  };

  socket.emit('addMessage', newMessage);
  socket.to(message.to).emit('addMessage', newMessage);
};

export default addMessage;
