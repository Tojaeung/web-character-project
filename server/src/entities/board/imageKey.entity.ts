import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '@src/entities/profile/user.entity';
import Post from '@src/entities/board/post.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.imageKeys, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.imageKeys, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}

@Entity('imageKey', { schema: 'board' })
class ImageKey extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  user_id: number;

  @Column()
  post_id: number;
}

export default ImageKey;
