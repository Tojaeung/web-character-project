import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { PostComment } from './postComment.entity';
import { Like } from './like.entity';
import { DisLike } from './dislike.entity';
import { ImageKey } from './imageKey.entity';

@Entity('post', { schema: 'board' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  board: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  views: number;

  @Index('user_id-postIdx')
  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PostComment, (postComment) => postComment.post)
  postComments: PostComment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => DisLike, (dislike) => dislike.post)
  dislikes: DisLike[];

  @OneToMany(() => ImageKey, (imageKey) => imageKey.post)
  imageKeys: ImageKey[];
}
