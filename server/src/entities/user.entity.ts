import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
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

  @Column()
  pw: string;

  @Column()
  bank: string;

  @Column()
  accountNumber: string;

  @Column({
    default:
      'https://character-project.s3.ap-southeast-1.amazonaws.com/avatar/b6d32a4f-2cb1-4bda-b3a1-be1664b66686.png',
  })
  avatar: string;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 'user' })
  role: string;

  @Column({ type: 'text', nullable: true })
  emailToken: string | null;

  @Column({ type: 'text' })
  pwToken: string;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
