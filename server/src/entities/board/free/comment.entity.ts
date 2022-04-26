import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Column,
} from 'typeorm';
import User from '@src/entities/user/user.entity';
import Free from '@src/entities/board/free/free.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.freeComments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Free, (free) => free.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'free_id' })
  free: Free;
}

@Entity('comment', { schema: 'free' })
class Comment extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Index('user_id-freeCommentIdx')
  @Column()
  user_id: number;

  @Index('free_id-freeCommentIdx')
  @Column()
  free_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
