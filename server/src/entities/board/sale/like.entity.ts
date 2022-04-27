import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Sale from '@src/entities/board/sale/sale.entity';

class Relation {
  @ManyToOne(() => Sale, (sale) => sale.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}

@Entity('like', { schema: 'sale' })
class Like extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'valuer_id' })
  valuerId: number;

  @Index('sale_id-likeIdx')
  @Column()
  sale_id: number;
}

export default Like;
