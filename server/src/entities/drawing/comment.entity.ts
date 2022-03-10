import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Drawing } from './drawing.entity';

@Entity('comment', { schema: 'drawing' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Index('user_id-commentIdx')
  @Column()
  user_id: string;

  @Index('drawing_id-commentIdx')
  @Column()
  drawing_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Drawing, (drawing) => drawing.comments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'drawing_id' })
  drawing: Drawing;
}
