import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Drawing } from '../drawing/drawing.entity';
import { DrawingComment } from '../drawing/drawingComment.entity';
import { Post } from '../board/post.entity';
import { PostComment } from '../board/postComment.entity';
import { ImageKey } from '../board/imageKey.entity';

@Entity('user', { schema: 'profile' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  chatId: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  nickname: string;

  @Column({ nullable: true, default: null })
  desc: string;

  @Column({
    default: 'https://character.s3.ap-northeast-2.amazonaws.com/avatar/default-avatar.png',
  })
  avatar: string;

  @Column({
    default: 'default-avatar.png',
  })
  avatarKey: string;

  @Column({
    default: 'https://character.s3.ap-northeast-2.amazonaws.com/cover/default-cover.jpg',
  })
  cover: string;

  @Column({
    default: 'default-cover.jpg',
  })
  coverKey: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ type: 'varchar' })
  pw: string | undefined;

  @Column({ type: 'varchar', nullable: true })
  emailToken: string | null;

  @Column({ type: 'varchar' })
  pwToken: string | undefined;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @Column({ default: 0 })
  exp: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Drawing, (drawing) => drawing.user)
  drawings: Drawing[];

  @OneToMany(() => DrawingComment, (drawingComment) => drawingComment.user)
  drawingComments: DrawingComment[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => PostComment, (postComment) => postComment.user)
  postComments: PostComment[];

  @OneToMany(() => ImageKey, (imageKey) => imageKey.user)
  imageKeys: ImageKey[];
}
