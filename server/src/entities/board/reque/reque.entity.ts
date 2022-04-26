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
import Comment from '@src/entities/board/reque/comment.entity';
import Like from '@src/entities/board/reque/like.entity';
import DisLike from '@src/entities/board/reque/dislike.entity';
import ImageKey from '@src/entities/board/reque/imageKey.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.reques, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.reque)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.reque)
  likes: Like[];

  @OneToMany(() => DisLike, (dislike) => dislike.reque)
  dislikes: DisLike[];

  @OneToMany(() => ImageKey, (imageKey) => imageKey.reque)
  imageKeys: ImageKey[];
}

@Entity('reque', { schema: 'reque' })
class Reque extends Relation {
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

export default Reque;
