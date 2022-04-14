import { SessionSocket } from '@src/types/index';
import cluster from '@src/helpers/redis.helper';
import parseChats from '@src/socketio/parseChats';

const deleteChat = async (socket: SessionSocket, chatId: string) => {
  const user = socket.request.session.user;

  // 레디스 업데이트를 위해 기존 대화상대 저장키를 삭제해준다.
  const chats = await cluster.lrange(`chats:${user.chatId}`, 0, -1);

  /*
   * 대화목록에 1명밖에 없으면 바로 키 통째로 지워준다. (간단)
   * 대화상대를 삭제한후 남은 대화상대가 없다면 undefined를 보내서 []으로 만들어준다.
   */
  if (chats.length === 1) {
    await cluster.del(`chats:${user.chatId}`);
    socket.emit('initChats', undefined);
    return;
  }

  /*
   * lrem을 이용해서 리스트에서 해당 대화유저 userId를 특정해서 제거 해준다.
   * 클라이언트에 보내기 위해 대화상대 정보들을 객체로 만들어준다.
   */
  await cluster.lrem(`chats:${user.chatId}`, 1, chatId);
  const updatedChats = await cluster.lrange(`chats:${user.chatId}`, 0, -1);
  const parsedChats = await parseChats(user.chatId, updatedChats);
  socket.emit('initChats', parsedChats);
};

export default deleteChat;
