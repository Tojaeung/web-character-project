import { SessionSocket } from '@src/types/index';
import redisClient from '@src/helpers/redis.helper';

interface MsgNotiType {
  from: string;
  to: string;
}

const addMsgNoti = async (socket: SessionSocket, msgNoti: MsgNotiType) => {
  const user = socket.request.session.user;

  // 메세지알림 객체를 스트링으로 바꿔준다.
  const msgNotiStr = [msgNoti.from, msgNoti.to].join(',');

  // 대화상대에게 온 메세지 알림을 레디스에 저장한다.
  await redisClient.lpush(`msgNotis:${msgNoti.to}`, msgNotiStr);

  const newMsgNoti = {
    from: msgNoti.from,
    to: msgNoti.to,
  };

  socket.to(msgNoti.to).emit('addMsgNoti', newMsgNoti);
};

export default addMsgNoti;
