import { getRepository } from 'typeorm';
import { SessionSocket } from '@interfaces/index';
import Notification from '@entities/notification/notification.entity';

const deleteNotifications = async (socket: SessionSocket) => {
  const user = socket.request.session.user;

  await getRepository(Notification).delete({ userId: user.id });

  const result = { ok: true, message: '모든 알림을 삭제하였습니다.' };

  socket.emit('deleteAllNotifications', result);
};

export default deleteNotifications;
