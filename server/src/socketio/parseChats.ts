import { User } from '@src/entities/user.entity';

const parseChats = async (chats: string[]) => {
  const newChats = [];
  for (const chat of chats) {
    const chatUser = await User.findOne({ id: chat });
    newChats.push({
      id: chatUser?.id,
      nickname: chatUser?.nickname,
      avatar: chatUser?.avatar,
    });
  }
  return newChats;
};

export default parseChats;
