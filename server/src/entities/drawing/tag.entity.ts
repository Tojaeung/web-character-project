import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Drawing } from './drawing.entity';

@Entity('tag', { schema: 'drawing' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @Index('drawing_id-tagIdx')
  @Column()
  drawing_id: number;

  @ManyToOne(() => Drawing, (drawing) => drawing.tags, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'drawing_id' })
  drawing: Drawing;
}
