import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Drawing } from './drawing.entity';

@Entity('dislike', { schema: 'drawing' })
export class DisLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Index('drawing_id-dislikeIdx')
  @Column()
  drawing_id: number;

  @ManyToOne(() => Drawing, (drawing) => drawing.dislikes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'drawing_id' })
  drawing: Drawing;
}
