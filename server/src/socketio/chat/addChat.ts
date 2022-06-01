import { getRepository } from 'typeorm';
import { SessionSocket } from '@interfaces/index';
import redis from '@helpers/redis.helper';
import User from '@entities/profile/user.entity';

/* 대화상대 추가 */
const addChat = async (socket: SessionSocket, chatId: string) => {
  const user = socket.request.session.user;

  // 자기 자신을 채팅상대로 추가했는지 확인합니다.
  if (chatId === user.chatId) {
    const result = { ok: false, message: '자신을 추가 할 수 없습니다.' };
    socket.emit('addChat', result);
    return;
  }

  // 추가한 채팅상대가 존재하는 유저인지 확인합니다.
  const chatUser = await getRepository(User).findOne({ chatId });
  if (!chatUser) {
    const result = { ok: false, message: '존재하지 않는 유저입니다.' };
    socket.emit('addChat', result);
    return;
  }

  // 추가한 채팅상대가 이미 채팅상대인지 확인합니다.
  const chats = await redis.lrange(`chats:${user.chatId}`, 0, -1);
  const existingChat = chats.filter((chat) => chat === chatId);
  if (existingChat.length > 0) {
    const result = { ok: false, message: '이미 존재하는 유저입니다.' };
    socket.emit('addChat', result);
    return;
  }

  // 채팅상대정보를 레디스에 저장합니다.
  await redis.lpush(`chats:${user.chatId}`, chatId);

  const newChat = {
    chatId: chatUser.chatId,
    nickname: chatUser.nickname,
    avatar: chatUser.avatar,
  };

  const result = { ok: true, message: '채팅 상대를 추가하였습니다.', newChat };
  socket.emit('addChat', result);
  return;
};

export default addChat;
