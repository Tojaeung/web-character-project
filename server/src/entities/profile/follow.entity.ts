import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('follow', { schema: 'profile' })
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('from_id-followIdx')
  @Column()
  from_id: number;

  @Column('to_id-followIdx')
  to_id: number;

  @ManyToOne(() => User, (user) => user.followees, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'from_id' })
  followee_user: User;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'to_id' })
  follower_user: User;
}
