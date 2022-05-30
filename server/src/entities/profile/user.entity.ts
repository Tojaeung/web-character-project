import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Drawing from '@entities/drawing/drawing.entity';
import DrawingComment from '@entities/drawing/comment.entity';

import Post from '@entities/board/post.entity';
import PostComment from '@entities/board/comment.entity';
import ImageKey from '@entities/board/imageKey.entity';

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

  // 소켓을 이용한 채팅시, 유저를 대표한다.
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

  // 자기소개
  @Column({ nullable: true, default: null })
  desc: string;

  // 프로필사진 s3경로
  @Column({
    default: process.env.DEFAULT_AVATAR_URL as string,
  })
  avatar: string;

  // 프로필사진 s3파일이름
  @Column({
    default: process.env.DEFAULT_AVATAR_KEY as string,
    name: 'avatar_key',
  })
  avatarKey: string;

  // 프로필배경사진 s3경로
  @Column({
    default: process.env.DEFAULT_COVER_URL as string,
  })
  cover: string;

  // 프로필배경사진 s3파일이름
  @Column({
    default: process.env.DEFAULT_COVER_KEY as string,
    name: 'cover_key',
  })
  coverKey: string;

  @Column({ default: 'user' })
  role: string;

  // 회원가입인증시, 회원을 찾아내는데 사용된다.
  // 회원가입인증 완료후, null로 변경된다.
  @Column({ type: 'varchar', name: 'email_token', nullable: true })
  emailToken: string | null;

  @Column({ type: 'varchar', select: false })
  pw?: string;

  @Column({ type: 'varchar', name: 'pw_token', select: false })
  pwToken?: string;

  // 회원가입인증 유무
  @Column({
    default: false,
    name: 'is_verified',
  })
  isVerified: boolean;

  // 불량유저 유무
  @Column({ default: false, name: 'is_penalty' })
  isPenalty: boolean;

  // 경험치, 레벨을 표현한다.
  @Column({ type: 'integer', default: 0 })
  exp: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
