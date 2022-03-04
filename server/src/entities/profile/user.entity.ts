import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Follow } from '@src/entities/profile/follow.entity';
import { Desc } from './desc.entity';
import { Photo } from '../photo/photo.entity';
import { Comment } from '../photo/comment.entity';

@Entity('user', { schema: 'profile' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  nickname: string;

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

  @Column()
  pwToken: string;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @OneToOne(() => Desc, (desc) => desc.user)
  desc: Desc;

  @OneToMany(() => Follow, (follow) => follow.followee_user)
  followees: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower_user)
  followers: Follow[];

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
