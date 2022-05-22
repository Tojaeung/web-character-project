import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Drawing from '@src/entities/drawing/drawing.entity';
import DrawingComment from '@src/entities/drawing/comment.entity';

import Post from '@src/entities/board/post.entity';
import PostComment from '@src/entities/board/comment.entity';
import ImageKey from '@src/entities/board/imageKey.entity';

class Relation {
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

@Entity('user', { schema: 'profile' })
class User extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'chat_id' })
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
    default: process.env.DEFAULT_AVATAR_URL as string,
  })
  avatar: string;

  @Column({
    default: process.env.DEFAULT_AVATAR_KEY as string,
    name: 'avatar_key',
  })
  avatarKey: string;

  @Column({
    default: process.env.DEFAULT_COVER_URL as string,
  })
  cover: string;

  @Column({
    default: process.env.DEFAULT_COVER_KEY as string,
    name: 'cover_key',
  })
  coverKey: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ type: 'varchar', select: false })
  pw?: string;

  @Column({ type: 'varchar', name: 'email_token', nullable: true })
  emailToken: string | null;

  @Column({ type: 'varchar', name: 'pw_token', select: false })
  pwToken?: string;

  @Column({
    default: false,
    name: 'is_verified',
  })
  isVerified: boolean;

  @Column({ type: 'integer', default: 0 })
  exp: number;

  @Column({ default: false, name: 'is_penalty' })
  isPenalty: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
