import { AbstractRepository, EntityRepository } from 'typeorm';
import Notification from '@src/entities/notification.entity';

@EntityRepository(Notification)
export class NotificationRepository extends AbstractRepository<Notification> {
  create = async (
    type: 'comment' | 'like' | 'penalty',
    content: string,
    userId: number,
    boardName?: string,
    postId?: number
  ): Promise<Notification> => {
    const result = await this.createQueryBuilder('notification')
      .insert()
      .into(Notification)
      .values({ type, content, userId, boardName, postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  update = async (notificationId: number): Promise<Notification> => {
    const result = await this.createQueryBuilder('notification')
      .update(Notification)
      .set({ is_confirmed: true })
      .where('id = :id', { id: notificationId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  // delete = async (postId: number): Promise<Notification> => {
  //   const result = await this.createQueryBuilder('post')
  //     .delete()
  //     .from(Post)
  //     .where('id = :id', { id: postId })
  //     .returning('*')
  //     .execute();
  //   return result.raw[0];
  // };
}
