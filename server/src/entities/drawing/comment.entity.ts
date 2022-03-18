import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Drawing } from './drawing.entity';

@Entity('comment', { schema: 'drawing' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Index('user_id-commentIdx')
  @Column()
  user_id: number;

  @Index('drawing_id-commentIdx')
  @Column()
  drawing_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Drawing, (drawing) => drawing.comments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'drawing_id' })
  drawing: Drawing;

  @ManyToOne(() => User, (user) => user.comments, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
