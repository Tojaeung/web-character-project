import { SessionSocket } from '@src/types/index';
import cluster from '@src/helpers/redis.helper';

interface MessageType {
  type: string;
  to: string;
  from: string;
  content: string;
  imgKey: string | undefined;
  date: string;
}

const addMessage = async (socket: SessionSocket, message: MessageType) => {
  const user = socket.request.session.user;

  // 메세지 객체를 스트링으로 바꿔준후 나와 대화상대 레디스에 저장한다.
  const messageStr = [message.type, message.to, message.from, message.content, message.imgKey, message.date].join(',');
  await cluster.rpush(`messages:${message.from}`, messageStr);
  await cluster.rpush(`messages:${message.to}`, messageStr);

  // 채팅상대는 메세지를 받을때 나를 친구목록에 추가한다.
  const chats = await cluster.lrange(`chats:${message.to}`, 0, -1);
  // 대화상대의 채팅상대에 내가 없다면 추가해준다.
  const existingChat = chats.filter((chat) => chat === message.from);
  if (existingChat.length === 0) {
    await cluster.lpush(`chats:${message.to}`, message.from);

    const newChat = {
      userId: user.userId,
      nickname: user.nickname,
      avatar: user.avatar,
    };

    socket.to(message.to).emit('addChat', newChat);
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
