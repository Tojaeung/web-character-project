import cluster from '@src/helpers/redis.helper';
import socket from '@src/socket';
import parseChats from '@src/socketio/parseChats';
import { SessionSocket } from '@src/types';

const updateLastMessage = async (socket: SessionSocket) => {
  const user = socket.request.session.user;

  // 자신의 대화상대를 업데이트 시킨다.
  const chats = await cluster.lrange(`chats:${user.userId}`, 0, -1);
  const parsedChats = await parseChats(user.userId, chats);
  socket.emit('initChats', parsedChats);
};

export default updateLastMessage;