import { SessionSocket } from '@interfaces/index';
import redis from '@helpers/redis.helper';

interface MessageNotiType {
  from: string;
  to: string;
}

const addMessageNoti = async (socket: SessionSocket, messageNoti: MessageNotiType) => {
  // 메세지알림 객체를 스트링으로 바꿔준다.
  const messageNotiStr = [messageNoti.from, messageNoti.to].join(',');

  // 대화상대에게 온 메세지 알림을 레디스에 저장한다.
  await redis.lpush(`messageNotis:${messageNoti.to}`, messageNotiStr);

  const newMessageNoti = {
    from: messageNoti.from,
    to: messageNoti.to,
  };

  socket.to(messageNoti.to).emit('addMessageNoti', newMessageNoti);
};

export default addMessageNoti;
