import { getCustomRepository, getRepository } from 'typeorm';
import { SessionSocket } from '@src/types/index';
import { NotificationRepository } from '@src/repositorys/notification.repository';
import Post from '@src/entities/board/post.entity';
import User from '@src/entities/user/user.entity';

interface LikeNotiType {
  type: 'like';
  userId: number; // 알림을 받는 유저 id
  boardName: string; // 어느 게시판에서 온 알림인지 확인하기 위해
  postId: number; // 알림이 생성되는 post(게시글)
}

const addLikeNoti = async (socket: SessionSocket, likeNotiObj: LikeNotiType) => {
  const nickname = socket.request.session.user.nickname;
  const notificationRepo = getCustomRepository(NotificationRepository);

  const { type, userId, boardName, postId } = likeNotiObj;
  const user = await getRepository(User).findOne({ id: userId });
  const post = await getRepository(Post).findOne({ id: postId });

  const content = `${nickname}님이 ${post?.title}에 좋아요를 눌렀습니다.`;

  const newNotification = await notificationRepo.create(type, content, userId, boardName, postId);

  const result = { ok: true, message: '게시글 작성자에게 좋아요 알림을 보냈습니다.', newNotification };

  socket.to(user?.chatId as string).emit('addNotification', result);
};

export default addLikeNoti;
