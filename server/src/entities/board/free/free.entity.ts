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
import Comment from '@src/entities/board/free/comment.entity';
import Like from '@src/entities/board/free/like.entity';
import DisLike from '@src/entities/board/free/dislike.entity';
import ImageKey from '@src/entities/board/free/imageKey.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.frees, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.free)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.free)
  likes: Like[];

  @OneToMany(() => DisLike, (dislike) => dislike.free)
  dislikes: DisLike[];

  @OneToMany(() => ImageKey, (imageKey) => imageKey.free)
  imageKeys: ImageKey[];
}

@Entity('free', { schema: 'free' })
class Free extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  views: number;

  @Index('user_id-freeIdx')
  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Free;
