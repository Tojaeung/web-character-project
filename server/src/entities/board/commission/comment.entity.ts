import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Column,
} from 'typeorm';
import User from '@src/entities/user/user.entity';
import Commission from '@src/entities/board/commission/commission.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.commissionComments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Commission, (commission) => commission.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'commission_id' })
  commission: Commission;
}

@Entity({ schema: 'commission' })
class Comment extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Index('user_id-commissionCommentIdx')
  @Column()
  user_id: number;

  @Index('commission_id-commissionCommentIdx')
  @Column()
  commission_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
