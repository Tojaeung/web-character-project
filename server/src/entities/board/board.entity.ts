import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Post from '@src/entities/board/post.entity';
import Comment from '@src/entities/board/comment.entity';

class Relation {
  @OneToMany(() => Post, (post) => post.board_id)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.board_id)
  comments: Comment[];
}

@Entity('board', { schema: 'board' })
class Board extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'en_name' })
  enName: string;

  @Column({ name: 'kr_name' })
  krName: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Board;
