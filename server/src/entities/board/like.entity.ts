import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Post from '@entities/board/post.entity';

class Relation {
  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}

@Entity('like', { schema: 'board' })
class Like extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  // 좋아요를 누른 사용자
  @Column()
  user_id: number;

  @Index('post_id-likeIdx')
  @Column()
  post_id: number;
}

export default Like;
