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
import { Desc } from '@src/entities/profile/desc.entitiy';
import { Auth } from '@src/entities/profile/auth.entity';
import { Follow } from '@src/entities/profile/follow.entity';

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

  @OneToOne(() => Desc, (desc) => desc.user)
  desc: Desc;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;

  @OneToMany(() => Follow, (follow) => follow.followee_user)
  followees: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower_user)
  followers: Follow[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
