import { getRepository } from 'typeorm';
import { SessionSocket } from '@src/types/index';
import Notification from '@src/entities/notification/notification.entity';

const deleteNotifications = async (socket: SessionSocket) => {
  const user = socket.request.session.user;

  await getRepository(Notification).delete({ userId: user.id });

  const result = { ok: true, message: '모든 알림을 삭제하였습니다.' };

  socket.emit('deleteAllNotifications', result);
};

export default deleteNotifications;
