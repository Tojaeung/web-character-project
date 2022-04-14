import { SessionSocket } from '@src/types/index';
import cluster from '@src/helpers/redis.helper';

const deleteUser = async (socket: SessionSocket) => {
  const user = socket.request.session.user;

  await cluster.del(`user:${user.chatId}`);
  await cluster.del(`chats:${user.chatId}`);
  await cluster.del(`messages:${user.chatId}`);
  await cluster.del(`msgNotis:${user.chatId}`);
};

export default deleteUser;
