import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@src/entities/user/user.entity';
import { Comment } from '@src/entities/drawing/comment.entity';
import { Like } from '@src/entities/drawing/like.entity';
import { DisLike } from '@src/entities/drawing/dislike.entity';

@Entity('drawing', { schema: 'drawing' })
export class Drawing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column()
  url: string;

  @Column()
  key: string;

  @Column({ default: 0 })
  views: number;

  @Index('user_id-drawingIdx')
  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.drawings, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.drawing)
  comments: Comment[];
  @OneToMany(() => Like, (like) => like.drawing)
  likes: Like[];
  @OneToMany(() => DisLike, (dislike) => dislike.drawing)
  dislikes: DisLike[];
}
