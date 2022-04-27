import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '@src/entities/user/user.entity';
import Free from '@src/entities/board/free/free.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.freeImageKeys, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Free, (free) => free.imageKeys, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'free_id' })
  free: Free;
}

@Entity('image_key', { schema: 'free' })
class ImageKey extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  user_id: number;

  @Column()
  free_id: number;
}

export default ImageKey;
