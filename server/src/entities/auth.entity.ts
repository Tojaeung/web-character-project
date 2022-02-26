import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('auth', { schema: 'profile' })
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  emailToken: string | null;

  @Column()
  pwToken: string;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @Index('user_id-authIdx')
  @Column()
  user_id: number;

  @OneToOne(() => User, (user) => user.auth)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
