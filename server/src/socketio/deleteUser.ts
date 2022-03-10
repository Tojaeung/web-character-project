import { SessionSocket } from '@src/types/index';
import cluster from '@src/helpers/redis.helper';

const deleteUser = async (socket: SessionSocket) => {
  const user = socket.request.session.user;

  await cluster.del(`user:${user.userId}`);
  await cluster.del(`chats:${user.userId}`);
  await cluster.del(`messages:${user.userId}`);
  await cluster.del(`msgNotis:${user.userId}`);
};

export default deleteUser;
