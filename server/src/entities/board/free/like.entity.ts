import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Free from '@src/entities/board/free/free.entity';

class Relation {
  @ManyToOne(() => Free, (free) => free.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'free_id' })
  free: Free;
}

@Entity('like', { schema: 'free' })
class Like extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'valuer_id' })
  valuerId: number;

  @Index('free_id-likeIdx')
  @Column()
  free_id: number;
}

export default Like;
