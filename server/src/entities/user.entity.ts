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
    nullable: true,
  })
  emailToken: string | null;

  @Column()
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
