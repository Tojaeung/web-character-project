import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Drawing } from './drawing.entity';

@Entity('like', { schema: 'drawing' })
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Index('drawing_id-likeIdx')
  @Column()
  drawing_id: number;

  @ManyToOne(() => Drawing, (drawing) => drawing.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'drawing_id' })
  drawing: Drawing;
}
