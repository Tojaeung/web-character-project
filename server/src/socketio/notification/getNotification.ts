import { getRepository } from 'typeorm';
import { SessionSocket } from '@interfaces/index';
import Notification from '@entities/notification/notification.entity';

const getNotification = async (socket: SessionSocket) => {
  const user = socket.request.session.user;

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

  const result = { ok: true, message: '알림을 가져왔습니다.', notifications };

  socket.emit('getNotification', result);
};

export default getNotification;
