import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '@src/entities/user/user.entity';
import Commission from '@src/entities/board/commission/commission.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.commissionImageKeys, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Commission, (commission) => commission.imageKeys, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'commission_id' })
  commission: Commission;
}

@Entity('image_key', { schema: 'commission' })
class ImageKey extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  user_id: number;

  @Column()
  commission_id: number;
}

export default ImageKey;
