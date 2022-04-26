import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import User from '@src/entities/user/user.entity';
import Comment from '@src/entities/board/sale/comment.entity';
import Like from '@src/entities/board/sale/like.entity';
import DisLike from '@src/entities/board/sale/dislike.entity';
import ImageKey from '@src/entities/board/sale/imageKey.entity';

class Relation {
  @ManyToOne(() => User, (user) => user.sales, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.sale)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.sale)
  likes: Like[];

  @OneToMany(() => DisLike, (dislike) => dislike.sale)
  dislikes: DisLike[];

  @OneToMany(() => ImageKey, (imageKey) => imageKey.sale)
  imageKeys: ImageKey[];
}

@Entity('sale', { schema: 'sale' })
class Sale extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  views: number;

  @Index('user_id-saleIdx')
  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sale;
