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
import { User } from '../user/user.entity';
import { Post } from './post.entity';

@Entity('post_comment', { schema: 'board' })
export class PostComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Index('user_id-postCommentIdx')
  @Column()
  user_id: number;

  @Index('post_id-postCommentIdx')
  @Column()
  post_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.postComments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.postComments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
