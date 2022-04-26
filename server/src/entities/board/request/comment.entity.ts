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
import Request from '@src/entities/board/request/request.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.requestComments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Request, (request) => request.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'request_id' })
  request: Request;
}

@Entity({ schema: 'request' })
class Comment extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Index('user_id-requestCommentIdx')
  @Column()
  user_id: number;

  @Index('request_id-requestCommentIdx')
  @Column()
  request_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
