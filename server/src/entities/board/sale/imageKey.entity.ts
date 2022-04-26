import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '@src/entities/user/user.entity';
import Sale from '@src/entities/board/sale/sale.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.saleImageKeys, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Sale, (sale) => sale.imageKeys, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}

@Entity('image_key', { schema: 'sale' })
class ImageKey extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'image_key' })
  imageKey: string;

  @Column()
  user_id: number;

  @Column()
  sale_id: number;
}

export default ImageKey;
