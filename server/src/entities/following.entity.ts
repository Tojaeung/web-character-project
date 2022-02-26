import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('following', { schema: 'profile' })
export class Following {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('following_id-followingIdx')
  @Column()
  following_id: number;

  @Column('user_id-followingIdx')
  user_id: number;

  @ManyToOne(() => User, (user) => user.followings)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
