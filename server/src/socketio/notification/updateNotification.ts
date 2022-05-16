import { getCustomRepository, getRepository } from 'typeorm';
import { SessionSocket } from '@src/types/index';
import { NotificationRepository } from '@src/repositorys/notification.repository';

const updateNotification = async (socket: SessionSocket, notificationId: number) => {
  const notificationRepo = getCustomRepository(NotificationRepository);

  const updatedNotification = await notificationRepo.update(notificationId);

  const result = { ok: true, message: '게시글 작성자에게 댓글 알림을 보냈습니다.', updatedNotification };

  socket.emit('updateNotification', result);
};

export default updateNotification;
