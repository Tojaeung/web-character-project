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
import { Tag } from './tag.entity';
import { Comment } from './comment.entity';

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

  @Index('user_id-drawingIdx')
  @Column()
  user_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.drawings, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Tag, (tag) => tag.drawing)
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.drawing)
  comments: Comment[];
}
