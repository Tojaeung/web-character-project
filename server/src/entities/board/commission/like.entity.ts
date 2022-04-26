import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Commission from '@src/entities/board/commission/commission.entity';

class Relation {
  @ManyToOne(() => Commission, (commission) => commission.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'commission_id' })
  commission: Commission;
}

@Entity('like', { schema: 'commission' })
class Like extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Index('commission_id-likeIdx')
  @Column()
  commission_id: number;
}

export default Like;
