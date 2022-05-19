import { SessionSocket } from '@src/types/index';
import cluster from '@src/helpers/redis.helper';
import parseChats from '@src/socketio/chat/parseChats';

const deleteChat = async (socket: SessionSocket, chatId: string) => {
  const user = socket.request.session.user;

  // lrem을 이용해서 리스트에서 해당 대화유저 userId를 특정해서 제거 해준다.
  // 클라이언트에 보내기 위해 대화상대 정보들을 객체로 만들어준다.
  await cluster.lrem(`chats:${user.chatId}`, 1, chatId);
  const updatedChats = await cluster.lrange(`chats:${user.chatId}`, 0, -1);
  const parsedChats = await parseChats(updatedChats);

  socket.emit('initChats', parsedChats);
};

export default deleteChat;
