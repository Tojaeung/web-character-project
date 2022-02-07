import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';

interface MsgNotiType {
  from: string;
  to: string;
}

const addMsgNoti = async (socket: SessionSocket, msgNoti: MsgNotiType) => {
  const user = socket.request.session.user;

  const msgNotiStr = [msgNoti.from, msgNoti.to].join(',');

  await redisClient.lpush(`msgNotis:${msgNoti.to}`, msgNotiStr);

  const newMsgNoti = {
    from: msgNoti.from,
    to: msgNoti.to,
  };

  socket.to(msgNoti.to).emit('addMsgNoti', newMsgNoti);
};

export default addMsgNoti;
