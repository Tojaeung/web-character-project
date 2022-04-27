import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '@src/entities/user/user.entity';
import Reque from '@src/entities/board/reque/reque.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.requeImageKeys, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Reque, (reque) => reque.imageKeys, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'reque_id' })
  reque: Reque;
}

@Entity('image_key', { schema: 'reque' })
class ImageKey extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  user_id: number;

  @Column()
  reque_id: number;
}

export default ImageKey;
