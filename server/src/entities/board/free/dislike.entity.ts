import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Free from '@src/entities/board/free/free.entity';

class Relation {
  @ManyToOne(() => Free, (free) => free.dislikes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'free_id' })
  free: Free;
}

@Entity('dislike', { schema: 'free' })
class DisLike extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Index('free_id-dislikeIdx')
  @Column()
  free_id: number;
}

export default DisLike;
