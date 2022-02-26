import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@src/repositorys/profile.repository';

// const userRepository = getCustomRepository(UserRepository);

const parseChats = async (chats: string[]) => {
  const userRepository = getCustomRepository(UserRepository);
  const newChats = [];
  for (const chat of chats) {
    const chatUser = await userRepository.findUserById(Number(chat));
    newChats.push({
      id: String(chatUser?.id),
      nickname: chatUser?.nickname,
      avatar: chatUser?.avatar,
    });
  }
  return newChats;
};

export default parseChats;
