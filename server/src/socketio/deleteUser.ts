import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';

const deleteUser = async (socket: SessionSocket) => {
  const user = socket.request.session.user;

  await redisClient.del(`user:${user.id}`);
  await redisClient.del(`chats:${user.id}`);
  await redisClient.del(`messages:${user.id}`);
  await redisClient.del(`msgNotis:${user.id}`);
};

export default deleteUser;
