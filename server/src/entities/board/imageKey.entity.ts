import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('image_key', { schema: 'board' })
export class ImageKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_key: string;

  @Column()
  post_id: number;
}
