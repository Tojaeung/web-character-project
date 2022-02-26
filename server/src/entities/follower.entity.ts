import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('follower', { schema: 'profile' })
export class Follower {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('follower_id-followerIdx')
  @Column()
  follower_id: number;

  @Column('user_id-followerIdx')
  user_id: number;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
