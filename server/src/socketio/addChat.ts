import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';
import parseChatList from './parseChats';
import { User } from '@src/entities/user.entity';

/* 대화상대 추가 */
const addChat = async (socket: SessionSocket, chatId: string, cb: Function) => {
  const user = socket.request.session.user;

  if (chatId === user.id) {
    cb({ ok: false, errorMessage: '자신을 추가 할 수 없습니다.' });
  }

  const chatUser = await User.findOne({ id: chatId });
  if (!chatUser) {
    cb({ ok: false, errorMessage: '존재하지 않는 유저입니다.' });
    return;
  }

  const chats = await redisClient.lrange(`chats:${user.id}`, 0, -1);
  // const parsedChatList = await parseChatList(chatList);

  // const existingChat = parsedChatList.filter((parsedChat) => parsedChat.nickname === chatNickname);

  const existingChat = chats.filter((chat) => chat === chatUser.id);

  if (existingChat.length > 0) {
    cb({ ok: false, errorMessage: '이미 존재하는 유저입니다.' });
    return;
  }

  // 나의 채팅 목록에 대화상대 추가
  // const chatAvatar = await redisClient.hget(`user:${chatNickname}`, 'avatar');

  // const newChat = { nickname: chatNickname, avatar: chatAvatar };
  // const newChatStr = [newChat.nickname, newChat.avatar].join(',');

  await redisClient.lpush(`chats:${user.id}`, chatUser.id);

  const newChat = {
    id: chatUser.id,
    nickname: chatUser.nickname,
    avatar: chatUser.avatar,
  };

  // 상대의 채팅 목록에 나를 추가
  // const meChatStr = [user.nickname, user.avatar].join(',');
  // await redisClient.lpush(`chats:${chatNickname}`, meChatStr);

  cb({ ok: true, newChat });
  return;
};

export default addChat;
