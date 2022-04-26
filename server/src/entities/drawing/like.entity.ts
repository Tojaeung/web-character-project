import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Drawing from '@src/entities/drawing/drawing.entity';

class Relation {
  @ManyToOne(() => Drawing, (drawing) => drawing.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'drawing_id' })
  drawing: Drawing;
}

@Entity('like', { schema: 'drawing' })
class Like extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Index('drawing_id-likeIdx')
  @Column()
  drawing_id: number;
}

export default Like;
