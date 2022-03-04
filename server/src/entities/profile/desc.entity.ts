import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

@Entity('desc', { schema: 'profile' })
export class Desc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true, default: null })
  desc: string;

  @Index('user_id-descIdx')
  @Column()
  user_id: number;

  @OneToOne(() => User, (user) => user.desc, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
