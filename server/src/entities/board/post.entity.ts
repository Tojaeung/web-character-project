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
import Board from '@src/entities/board/board.entity';
import Comment from '@src/entities/board/comment.entity';
import Like from '@src/entities/board/like.entity';
import DisLike from '@src/entities/board/dislike.entity';
import ImageKey from '@src/entities/board/imageKey.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Board, (board) => board.posts, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => DisLike, (dislike) => dislike.post)
  dislikes: DisLike[];

  @OneToMany(() => ImageKey, (imageKey) => imageKey.post)
  imageKeys: ImageKey[];
}

@Entity('post', { schema: 'board' })
class Post extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  views: number;

  @Index('user_id-postIdx')
  @Column()
  user_id: number;

  @Index('board_id-postIdx')
  @Column()
  board_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Post;
