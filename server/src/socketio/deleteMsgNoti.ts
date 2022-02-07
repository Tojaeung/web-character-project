import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';
import parseMsgNotis from '@src/socketio/parseMsgNotis';

const deleteMsgNoti = async (socket: SessionSocket, id: string) => {
  const user = socket.request.session.user;

  const msgNoti = await redisClient.lrange(`msgNotis:${user.id}`, 0, -1);
  const parsedMsgNotis = await parseMsgNotis(msgNoti);

  const newMsgNotis = parsedMsgNotis.filter((parsedMsgNoti) => parsedMsgNoti.from !== id);

  await redisClient.del(`msgNotis:${user.id}`);

  if (newMsgNotis.length > 0) {
    for (const newMsgNoti of newMsgNotis) {
      const msgNotiStr = [newMsgNoti.from, newMsgNoti.to].join(',');
      await redisClient.lpush(`msgNotis:${user.id}`, msgNotiStr);
    }
  }
  socket.emit('initMsgNotis', newMsgNotis);
};

export default deleteMsgNoti;
