import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Follow } from '@src/entities/user/follow.entity';
import { Drawing } from '../drawing/drawing.entity';

@Entity('user', { schema: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  userId: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Follow, (follow) => follow.following_user)
  followings: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower_user)
  followers: Follow[];

  @OneToMany(() => Drawing, (drawing) => drawing.user)
  drawings: Drawing[];
}
