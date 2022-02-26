import { SessionSocket } from '@src/types/index';
import cluster from '@src/helpers/redis.helper';

const deleteUser = async (socket: SessionSocket) => {
  const user = socket.request.session.user;

  await cluster.del(`user:${user.id}`);
  await cluster.del(`chats:${user.id}`);
  await cluster.del(`messages:${user.id}`);
  await cluster.del(`msgNotis:${user.id}`);
};

export default deleteUser;
