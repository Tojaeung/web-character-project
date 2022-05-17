import { getCustomRepository, getRepository } from 'typeorm';
import { SessionSocket } from '@src/types/index';
import { NotificationRepository } from '@src/repositorys/notification.repository';

const updateAllNotifications = async (socket: SessionSocket) => {
  const user = socket.request.session.user;
  const notificationRepo = getCustomRepository(NotificationRepository);

  await notificationRepo.updateAll(user.id);

  const result = { ok: true, message: '유저의 모든 알림을 읽음처리 하였습니다.' };

  socket.emit('updateAllNotifications', result);
};

export default updateAllNotifications;
