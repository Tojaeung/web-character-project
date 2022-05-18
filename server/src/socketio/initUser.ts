import { SessionSocket } from '@src/types/index';
import cluster from '@src/helpers/redis.helper';
import parseChats from './chat/parseChats';
import parseMessages from './chat/parseMessages';
import parseMsgNotis from './chat/parseMsgNotis';
import { getRepository } from 'typeorm';
import Notification from '@src/entities/notification/notification.entity';

const initUser = async (socket: SessionSocket) => {
  const user = socket.request.session.user;

  // 자신의 대화상대를 초기화 시킨다.
  const chats = await cluster.lrange(`chats:${user.chatId}`, 0, -1);
  const parsedChats = await parseChats(user.chatId, chats);
  socket.emit('initChats', parsedChats);

  // 자신의 메세지를 초기화 시킨다.
  const messages = await cluster.lrange(`messages:${user.chatId}`, 0, -1);
  const parsedMessages = await parseMessages(messages);
  socket.emit('initMessages', parsedMessages);

  // 자신의 메세지알림을 초기화 시킨다.
  const msgNotis = await cluster.lrange(`msgNotis:${user.chatId}`, 0, -1);
  const parsedMsgNotis = await parseMsgNotis(msgNotis);
  socket.emit('initMsgNotis', parsedMsgNotis);

  // 자신의 알림을 초기화 시킨다.
  const notifications = await getRepository(Notification).find({
    where: { userId: user.id },
    order: { created_at: 'DESC' },
  });

  // 인덱스 19번 이상부터 모두 제거
  if (notifications.length > 20) {
    for (let i = 20; i < notifications.length; i++) {
      await getRepository(Notification).delete({ id: notifications[i].id });
    }
    notifications.splice(20);
  }

  const result = { ok: true, message: '알림을 초기화 했습니다.', notifications };
  socket.emit('initNotification', result);
};

export default initUser;
