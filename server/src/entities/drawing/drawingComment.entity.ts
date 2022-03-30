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
import { User } from '../user/user.entity';
import { Drawing } from './drawing.entity';

@Entity('drawing_comment', { schema: 'drawing' })
export class DrawingComment {
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

  @ManyToOne(() => User, (user) => user.drawingComments, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Drawing, (drawing) => drawing.drawingComments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'drawing_id' })
  drawing: Drawing;
}
