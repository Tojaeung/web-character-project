import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  pw: string;

  @Column()
  bank: string;

  @Column()
  accountNumber: string;
}
