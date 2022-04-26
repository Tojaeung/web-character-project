import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '@src/entities/user/user.entity';
import Drawing from '@src/entities/drawing/drawing.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.drawingComments, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Drawing, (drawing) => drawing.comments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'drawing_id' })
  drawing: Drawing;
}

@Entity('comment', { schema: 'drawing' })
class Comment extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Index('user_id-drawingCommentIdx')
  @Column()
  user_id: number;

  @Index('drawing_id-drawingCommentIdx')
  @Column()
  drawing_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
