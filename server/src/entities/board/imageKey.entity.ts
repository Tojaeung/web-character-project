import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '@entities/profile/user.entity';
import Post from '@entities/board/post.entity';

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

  // 게시물에 올라온 사진파일
  @Column()
  key: string;

  @Column()
  user_id: number;

  @Column()
  post_id: number;
}

export default ImageKey;
