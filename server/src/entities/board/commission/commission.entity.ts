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
import Comment from '@src/entities/board/commission/comment.entity';
import Like from '@src/entities/board/commission/like.entity';
import DisLike from '@src/entities/board/commission/dislike.entity';
import ImageKey from '@src/entities/board/commission/imageKey.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.commissions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.commission)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.commission)
  likes: Like[];

  @OneToMany(() => DisLike, (dislike) => dislike.commission)
  dislikes: DisLike[];

  @OneToMany(() => ImageKey, (imageKey) => imageKey.commission)
  imageKeys: ImageKey[];
}

@Entity({ schema: 'commission' })
class Commission extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  views: number;

  @Index('user_id-commissionIdx')
  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Commission;
