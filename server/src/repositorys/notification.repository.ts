import { AbstractRepository, EntityRepository } from 'typeorm';
import Notification from '@src/entities/notification.entity';
import NotificationType from '@src/types/notification.type';

@EntityRepository(Notification)
export class NotificationRepository extends AbstractRepository<Notification> {
  create = async (
    type: NotificationType,
    content: string,
    userId: number,
    board: string,
    postId: number
  ): Promise<Notification> => {
    const result = await this.createQueryBuilder('notification')
      .insert()
      .into(Notification)
      .values({ type, content, userId, board, postId })
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

  updateAll = async (id: number): Promise<Notification> => {
    const result = await this.createQueryBuilder('notification')
      .update(Notification)
      .set({ is_confirmed: true })
      .where('userId = :id', { id })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}
