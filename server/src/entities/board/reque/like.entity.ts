import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Reque from '@src/entities/board/reque/reque.entity';

class Relation {
  @ManyToOne(() => Reque, (reque) => reque.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'request_id' })
  reque: Reque;
}

@Entity('like', { schema: 'reque' })
class Like extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'valuer_id' })
  valuerId: number;

  @Index('reque_id-likeIdx')
  @Column()
  reque_id: number;
}

export default Like;
