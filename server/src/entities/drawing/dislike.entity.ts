import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Drawing from '@src/entities/drawing/drawing.entity';

class Relation {
  @ManyToOne(() => Drawing, (drawing) => drawing.dislikes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'drawing_id' })
  drawing: Drawing;
}

@Entity('dislike', { schema: 'drawing' })
class DisLike extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Index('drawing_id-dislikeIdx')
  @Column()
  drawing_id: number;
}

export default DisLike;
