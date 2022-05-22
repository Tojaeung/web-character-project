import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('notification', { schema: 'notification' })
class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  content: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  board: string;

  @Column({ name: 'post_id' })
  postId: number;

  @Column({ default: false })
  is_confirmed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
