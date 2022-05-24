import { SessionSocket } from '@interfaces/index';
import cluster from '@helpers/redis.helper';
import parseMessageNotis from '@socketio/chat/parseMessageNotis';

const deleteMessageNoti = async (socket: SessionSocket, chatId: string) => {
  const user = socket.request.session.user;

  // 레디스에 저장되어 있는 메세지 알림 스트링을 객체로 바꿔준다.
  const messageNotis = await cluster.lrange(`messageNotis:${user.chatId}`, 0, -1);

  // 대화상대에게 온 메세지 알림을 제외한 새로운 메세지 알림을 만들기 위해 기존 메세지알림을 삭제해준다.
  await cluster.del(`messageNotis:${user.chatId}`);

  const parsedMessageNotis = await parseMessageNotis(messageNotis);

  // 메세지알림을 확인하였으니, 대화상대에게 온 메세지 알림을 제외해준다.
  const updatedMessageNotis = parsedMessageNotis.filter((parsedMessageNoti) => parsedMessageNoti.from !== chatId);

  if (!updatedMessageNotis.length) return socket.emit('initMessageNotis', updatedMessageNotis);

  // 새롭게 메세지알림 정보를 레디스에 저장한다.

  for (const updatedMessageNoti of updatedMessageNotis) {
    const messageNotiStr = [updatedMessageNoti.from, updatedMessageNoti.to].join(',');
    await cluster.lpush(`messageNotis:${user.chatId}`, messageNotiStr);
  }

  return socket.emit('initMessageNotis', updatedMessageNotis);
};

export default deleteMessageNoti;
