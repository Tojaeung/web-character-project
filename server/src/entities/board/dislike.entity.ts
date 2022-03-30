import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('dislike', { schema: 'board' })
export class DisLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Index('post_id-dislikeIdx')
  @Column()
  post_id: number;

  @ManyToOne(() => Post, (post) => post.dislikes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
