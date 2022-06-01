import { SessionSocket } from '@interfaces/index';
import redis from '@helpers/redis.helper';
import parseChats from './chat/parseChats';
import parseMessages from './chat/parseMessages';
import parseMessageNotis from './chat/parseMessageNotis';
import { getRepository } from 'typeorm';
import Notification from '@entities/notification/notification.entity';

const initUser = async (socket: SessionSocket) => {
  const user = socket.request.session.user;

  // 자신의 대화상대를 초기화 시킨다.
  const chatIds = await redis.lrange(`chats:${user.chatId}`, 0, -1);
  const chats = await parseChats(chatIds);
  socket.emit('initChats', chats);

  // 자신의 메세지를 초기화 시킨다.
  const messages = await redis.lrange(`messages:${user.chatId}`, 0, -1);
  const parsedMessages = await parseMessages(messages);
  socket.emit('initMessages', parsedMessages);

  // 자신의 메세지알림을 초기화 시킨다.
  const messageNotis = await redis.lrange(`messageNotis:${user.chatId}`, 0, -1);
  const parsedMessageNotis = await parseMessageNotis(messageNotis);
  socket.emit('initMessageNotis', parsedMessageNotis);

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
