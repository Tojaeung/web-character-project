import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '@src/entities/user/user.entity';
import Request from '@src/entities/board/request/request.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.requestImageKeys, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Request, (request) => request.imageKeys, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'request_id' })
  request: Request;
}

@Entity('image_key', { schema: 'request' })
class ImageKey extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'image_key' })
  imageKey: string;

  @Column()
  user_id: number;

  @Column()
  request_id: number;
}

export default ImageKey;
