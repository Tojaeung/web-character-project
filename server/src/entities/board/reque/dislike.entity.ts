import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Reque from '@src/entities/board/reque/reque.entity';

class Relation {
  @ManyToOne(() => Reque, (reque) => reque.dislikes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'reque_id' })
  reque: Reque;
}

@Entity('dislike', { schema: 'reque' })
class DisLike extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Index('reque_id-dislikeIdx')
  @Column()
  reque_id: number;
}

export default DisLike;
