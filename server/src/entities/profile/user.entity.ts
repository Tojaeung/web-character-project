import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Follow } from '@src/entities/profile/follow.entity';

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

  @Column({ type: 'text', nullable: true, default: null })
  desc: string;

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

  @OneToMany(() => Follow, (follow) => follow.followee_user)
  followees: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower_user)
  followers: Follow[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
