import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('desc', { schema: 'profile' })
export class Desc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: null })
  content: string;

  @Index('user_id-descIdx')
  @Column()
  user_id: number;

  @OneToOne(() => User, (user) => user.desc)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
