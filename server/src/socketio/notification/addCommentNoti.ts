import { getCustomRepository, getRepository } from 'typeorm';
import { SessionSocket } from '@src/types/index';
import { NotificationRepository } from '@src/repositorys/notification.repository';
import Post from '@src/entities/board/post.entity';
import User from '@src/entities/user/user.entity';

interface CommentNotiType {
  type: 'comment';
  userId: number; // 알림을 받는 유저 id
  postId: number; // 알림이 생성되는 post(게시글)
}

const addCommentNoti = async (socket: SessionSocket, commentNotiObj: CommentNotiType) => {
  const nickname = socket.request.session.user.nickname;
  const notificationRepo = getCustomRepository(NotificationRepository);

  const { type, userId, postId } = commentNotiObj;

  const user = await getRepository(User).findOne({ id: userId });
  const post = await getRepository(Post).findOne({ id: postId });
  const content = `${nickname}님이 ${post?.title}에 댓글을 남겼습니다.`;
  const newNotification = await notificationRepo.create(type, content, userId, postId);

  const result = { ok: true, message: '게시글 작성자에게 댓글 알림을 보냈습니다.', newNotification };

  socket.to(user?.chatId as string).emit('addNotification', result);
};

export default addCommentNoti;
