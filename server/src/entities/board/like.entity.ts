import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('like', { schema: 'board' })
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Index('post_id-likeIdx')
  @Column()
  post_id: number;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
