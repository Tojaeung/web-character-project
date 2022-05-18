import { getCustomRepository, getRepository } from 'typeorm';
import { SessionSocket } from '@src/types/index';
import { NotificationRepository } from '@src/repositorys/notification.repository';
import Post from '@src/entities/board/post.entity';
import User from '@src/entities/user/user.entity';
import Board from '@src/entities/board/board.entity';
import NotificationType from '@src/types/notification.type';
import logger from '@src/helpers/winston.helper';

interface AddNotificationType {
  type: NotificationType;
  userId: number; // 알림을 받는 유저 id
  board: string;
  postId: number; // 알림이 생성되는 post(게시글)
}

const addNotification = async (socket: SessionSocket, addNotificationObj: AddNotificationType) => {
  const nickname = socket.request.session.user.nickname;
  const notificationRepo = getCustomRepository(NotificationRepository);

  const { type, userId, board, postId } = addNotificationObj;

  const user = await getRepository(User).findOne({ id: userId });
  if (!user) {
    logger.warn('존재하지 않는 유저에게 알림을 보내려고 시도합니다.');
    const result = { ok: false, message: '존재하지 않는 유저입니다.' };
    return socket.emit('addNotification', result);
  }

  const isExistingBoard = await getRepository(Board).findOne({ enName: board });
  if (!isExistingBoard) {
    logger.warn('존재하지 않는 게시판에서 알림을 생성하려고 시도합니다.');
    const result = { ok: false, message: '존재하지 않는 게시판입니다.' };
    return socket.emit('addNotification', result);
  }

  const post = await getRepository(Post).findOne({ id: postId });
  if (!post) {
    logger.warn('존재하지 않는 게시물에서 알림을 생성하려고 시도합니다.');
    const result = { ok: false, message: '존재하지 않는 게시물 입니다.' };
    return socket.emit('addNotification', result);
  }

  const content = `${nickname}님이 ${post?.title}에 댓글을 남겼습니다.`;
  const newNotification = await notificationRepo.create(type, content, userId, board, postId);

  const result = { ok: true, message: '게시글 작성자에게 댓글 알림을 보냈습니다.', newNotification };

  socket.to(user?.chatId as string).emit('addNotification', result);
};

export default addNotification;
