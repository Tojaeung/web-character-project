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
import Sale from '@src/entities/board/sale/sale.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.saleComments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Sale, (sale) => sale.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}

@Entity('comment', { schema: 'sale' })
class Comment extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Index('user_id-saleCommentIdx')
  @Column()
  user_id: number;

  @Index('sale_id-saleCommentIdx')
  @Column()
  sale_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
