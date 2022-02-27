import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('desc', { schema: 'profile' })
export class Desc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true, default: null })
  desc: string;

  @Column()
  user_id: number;

  @OneToOne(() => User, (user) => user.desc, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
