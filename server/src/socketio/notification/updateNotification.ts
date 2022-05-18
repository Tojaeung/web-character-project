import { getCustomRepository, getRepository } from 'typeorm';
import { SessionSocket } from '@src/types/index';
import { NotificationRepository } from '@src/repositorys/notification.repository';
import Notification from '@src/entities/notification/notification.entity';
import logger from '@src/helpers/winston.helper';

const updateNotification = async (socket: SessionSocket, notificationId: number) => {
  const notificationRepo = getCustomRepository(NotificationRepository);

  const isExistingNotification = await getRepository(Notification).count({ id: notificationId });
  if (!isExistingNotification) {
    logger.warn('존재하지 않는 알림을 확인으로 처리하려고 시도합니다.');
    const result = { ok: false, message: '존재하지 않는 알림입니다.' };
    return socket.emit('updateNotification', result);
  }

  // is_confirmed을 true로 변경하여 확인 안된 알림과 구분한다.
  const updatedNotification = await notificationRepo.update(notificationId);

  const result = { ok: true, message: '게시글 작성자에게 댓글 알림을 보냈습니다.', updatedNotification };

  socket.emit('updateNotification', result);
};

export default updateNotification;
