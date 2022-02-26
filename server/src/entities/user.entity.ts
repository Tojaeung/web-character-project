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
import { Desc } from '@src/entities/desc.entitiy';
import { Auth } from '@src/entities/auth.entity';
import { Follower } from '@src/entities/follower.entity';
import { Following } from '@src/entities/following.entity';

@Entity('user', { schema: 'profile' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('email-userIdx')
  @Column({
    unique: true,
  })
  email: string;

  @Index('nickname-userIdx')
  @Column({
    unique: true,
  })
  nickname: string;

  @Column({ type: 'varchar' })
  pw: string | undefined;

  @Column({
    default: 'https://character.s3.ap-northeast-2.amazonaws.com/avatar/default-avatar.png',
  })
  avatar: string;

  @Column({
    default: 'default-avatar.png',
  })
  avatarKey: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: 0 })
  exp: number;

  @OneToOne(() => Desc, (desc) => desc.user)
  desc: Desc;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;

  @OneToMany(() => Follower, (follower) => follower.user)
  followers: Follower[];

  @OneToMany(() => Following, (following) => following.user)
  followings: Following[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
