import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@src/repositorys/user.repository';
import cluster from '@src/helpers/redis.helper';
import parseMessages from '@src/socketio/parseMessages';
import moment from 'moment';

const parseChats = async (chatId: string, chats: string[]) => {
  const userRepository = getCustomRepository(UserRepository);
  const newChats = [];
  for (const chat of chats) {
    // 대화상대의 정보를 가져온다.
    const chatUser = await userRepository.findUserByUserId(chat);

    // 대화상대와의 메세지 정보를 가져온다.
    const messages = await cluster.lrange(`messages:${chatId}`, 0, -1);
    const parsedMessages = await parseMessages(messages);
    const filteredMessages = parsedMessages.filter((parsedMessage) => parsedMessage.from || parsedMessage.to === chat);

    // 대화상대와 기존 대화가 없을때 undefined로 지정
    if (filteredMessages.length === 0) {
      newChats.push({
        chatId: chatUser?.chatId,
        nickname: chatUser?.nickname,
        avatar: chatUser?.avatar,
        lastType: undefined,
        lastMessage: undefined,
        lastDate: moment().format(),
      });
    } else {
      // 가장 마지막에 대화한 정보를 가져온다.
      const lastMessage = filteredMessages[filteredMessages.length - 1];

      // 가장 마지막 대화가 텍스트라면 대화내용을 보내준다.
      newChats.push({
        chatId: chatUser?.chatId,
        nickname: chatUser?.nickname,
        avatar: chatUser?.avatar,
        lastType: lastMessage.type,
        lastMessage: lastMessage.content,
        lastDate: lastMessage.date,
      });
    }
  }

  return newChats;
};

export default parseChats;
