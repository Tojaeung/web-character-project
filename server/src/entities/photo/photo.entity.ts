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
import { User } from '@src/entities/profile/user.entity';
import { PhotoTag } from './photoTag.entity';
import { Comment } from './comment.entity';

@Entity('photo', { schema: 'photo' })
export class Photo {
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

  @Index('user_id-photoIdx')
  @Column()
  user_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.photos, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PhotoTag, (photoTag) => photoTag.photo)
  photoTags: PhotoTag[];

  @OneToMany(() => Comment, (comment) => comment.photo)
  comments: Comment[];
}
