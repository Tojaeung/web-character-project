import { getRepository } from 'typeorm';
import User from '@entities/profile/user.entity';

const parseChats = async (chatIds: string[]) => {
  if (!chatIds.length) return [];

  // 대화 상대방들의 정보를 가져온다.
  const parsedChats = [];
  for (const chatId of chatIds) {
    // 대화상대의 정보를 가져온다.
    const chatUser = await getRepository(User).findOne({ chatId });
    parsedChats.push({
      chatId: chatUser?.chatId,
      nickname: chatUser?.nickname,
      avatar: chatUser?.avatar,
    });
  }

  return parsedChats;
};

export default parseChats;
