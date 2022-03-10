import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@src/repositorys/user.repository';

const parseChats = async (chats: string[]) => {
  const userRepository = getCustomRepository(UserRepository);
  const newChats = [];
  for (const chat of chats) {
    const chatUser = await userRepository.findUserByUserId(chat);
    newChats.push({
      userId: chatUser?.userId,
      nickname: chatUser?.nickname,
      avatar: chatUser?.avatar,
    });
  }
  return newChats;
};

export default parseChats;
