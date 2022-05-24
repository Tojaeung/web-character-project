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
import User from '@entities/profile/user.entity';
import Post from '@entities/board/post.entity';
import Board from '@entities/board/board.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.postComments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Board, (board) => board.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}

@Entity('comment', { schema: 'board' })
class Comment extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Index('user_id-commentIdx')
  @Column()
  user_id: number;

  @Index('board_id-commentIdx')
  @Column()
  board_id: number;

  @Index('post_id-commentIdx')
  @Column()
  post_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
