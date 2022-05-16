import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Post from '@src/entities/board/post.entity';

class Relation {
  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}

@Entity('dislike', { schema: 'board' })
class DisLike extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  // 싫어요를 누른 사용자
  @Column()
  user_id: number;

  @Index('post_id-dislikeIdx')
  @Column()
  post_id: number;
}

export default DisLike;
