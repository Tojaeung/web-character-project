import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';
import parseMsgNotis from '@src/socketio/parseMsgNotis';

const deleteMsgNoti = async (socket: SessionSocket, chatId: string) => {
  const user = socket.request.session.user;

  // 레디스에 저장되어 있는 메세지 알림 스트링을 객체로 바꿔준다.
  const msgNoti = await redisClient.lrange(`msgNotis:${user.id}`, 0, -1);

  // 대화상대에게 온 메세지 알림을 제외한 새로운 메세지 알림을 만들기 위해 기존 메세지알림을 삭제해준다.
  await redisClient.del(`msgNotis:${user.id}`);

  const parsedMsgNotis = await parseMsgNotis(msgNoti);

  // 메세지알림을 확인하였으니, 대화상대에게 온 메세지 알림을 제외해준다.
  const newMsgNotis = parsedMsgNotis.filter((parsedMsgNoti) => parsedMsgNoti.from !== chatId);

  if (newMsgNotis.length === 0) {
    socket.emit('initMsgNotis', undefined);
    return;
  }

  if (newMsgNotis.length > 0) {
    // 새롭게 메세지알림 정보를 레디스에 저장한다.
    if (newMsgNotis.length > 0) {
      for (const newMsgNoti of newMsgNotis) {
        const msgNotiStr = [newMsgNoti.from, newMsgNoti.to].join(',');
        await redisClient.lpush(`msgNotis:${user.id}`, msgNotiStr);
      }
    }
    socket.emit('initMsgNotis', newMsgNotis);
    return;
  }
};

export default deleteMsgNoti;
