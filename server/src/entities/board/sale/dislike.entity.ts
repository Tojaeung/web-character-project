import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Sale from '@src/entities/board/sale/sale.entity';

class Relation {
  @ManyToOne(() => Sale, (sale) => sale.dislikes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}

@Entity('dislike', { schema: 'sale' })
class DisLike extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'valuer_id' })
  valuerId: number;

  @Index('sale_id-dislikeIdx')
  @Column()
  sale_id: number;
}

export default DisLike;
