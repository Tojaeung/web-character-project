import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';
import parseMsgNotis from '@src/socketio/parseMsgNotis';

interface ObjType {
  from: string;
}

const deleteMsgNoti = async (socket: SessionSocket, obj: ObjType) => {
  const user = socket.request.session.user;

  const msgNoti = await redisClient.lrange(`msgNotis:${user.nickname}`, 0, -1);
  const parsedMsgNotis = await parseMsgNotis(msgNoti);

  const newMsgNotis = parsedMsgNotis.filter((parsedMsgNoti) => parsedMsgNoti.from !== obj.from);

  await redisClient.del(`msgNotis:${user.nickname}`);

  if (newMsgNotis.length > 0) {
    for (const newMsgNoti of newMsgNotis) {
      const msgNotiStr = [newMsgNoti.from, newMsgNoti.to].join(',');
      await redisClient.lpush(`msgNotis:${user.nickname}`, msgNotiStr);
    }
  }
  socket.emit('initMsgNotis', newMsgNotis);
};

export default deleteMsgNoti;
