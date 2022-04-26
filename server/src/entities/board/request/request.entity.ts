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
import User from '@src/entities/user/user.entity';
import Comment from '@src/entities/board/request/comment.entity';
import Like from '@src/entities/board/request/like.entity';
import DisLike from '@src/entities/board/request/dislike.entity';
import ImageKey from '@src/entities/board/request/imageKey.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.requests, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.request)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.request)
  likes: Like[];

  @OneToMany(() => DisLike, (dislike) => dislike.request)
  dislikes: DisLike[];

  @OneToMany(() => ImageKey, (imageKey) => imageKey.request)
  imageKeys: ImageKey[];
}

@Entity('request', { schema: 'request' })
class Request extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  views: number;

  @Index('user_id-requestIdx')
  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Request;
