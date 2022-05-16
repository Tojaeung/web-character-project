import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('notification', { schema: 'notification' })
class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'comment' | 'like' | 'penalty';

  @Column()
  content: string;

  @Column({ name: 'user_id' })
  userId: number;

  // notification의 type이 admin일때 undefined이다.
  // 관리자가 보내는 알림이기 때문에 post(게시글) 정보가 필요하지 않다.
  @Column({ name: 'post_id' })
  postId?: number;

  @Column({ name: 'is_confirmed', default: false })
  isConfirmed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
