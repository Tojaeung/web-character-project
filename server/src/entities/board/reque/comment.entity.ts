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
import Reque from '@src/entities/board/reque/reque.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.requeComments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Reque, (reque) => reque.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'reque_id' })
  reque: Reque;
}

@Entity({ schema: 'reque' })
class Comment extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Index('user_id-requestCommentIdx')
  @Column()
  user_id: number;

  @Index('reque_id-requeCommentIdx')
  @Column()
  reque_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
