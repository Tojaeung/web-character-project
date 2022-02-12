import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  nickname: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({ type: 'text' })
  pw: string | undefined;

  @Column()
  bank: string;

  @Column()
  accountNumber: string;

  @Column({
    default: 'https://character.s3.ap-northeast-2.amazonaws.com/avatar/default-avatar.png',
  })
  avatar: string;

  @Column({
    default: 'default-avatar.png',
  })
  avatarKey: string;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 'user' })
  role: string;

  @Column({ type: 'text', nullable: true })
  emailToken: string | null;

  @Column({ type: 'text' })
  pwToken: string | undefined;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @Column({ type: 'text', array: true, default: [] })
  followers: string[];

  @Column({ type: 'text', array: true, default: [] })
  followings: string[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
