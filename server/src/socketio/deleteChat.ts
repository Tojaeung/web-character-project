import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';
import parseChats from '@src/socketio/parseChats';

const deleteChat = async (socket: SessionSocket, chatId: string) => {
  const user = socket.request.session.user;

  // 레디스 업데이트를 위해 기존 대화상대 저장키를 삭제해준다.
  const chats = await redisClient.lrange(`chats:${user.id}`, 0, -1);
  const redisChats = chats.filter((chat) => chat !== chatId);
  await redisClient.del(`chats:${user.id}`);

  // 대화상대를 삭제한후 남은 대화상대가 없다면 undefined를 보내서 []으로 만들어준다.
  if (redisChats.length === 0) {
    socket.emit('initChats', undefined);
    return;
  }

  if (redisChats.length > 0) {
    await redisClient.lpush(`chats:${user.id}`, redisChats);

    // 클라이언트에 보내기 위해 대화상대 정보들을 객체로 만들어준다.
    const parsedChats = await parseChats(chats);
    const newChats = parsedChats.filter((parsedChat) => parsedChat.id !== chatId);

    socket.emit('initChats', newChats);

    return;
  }
};

export default deleteChat;
