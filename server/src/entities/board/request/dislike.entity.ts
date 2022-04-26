import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Request from '@src/entities/board/request/request.entity';

class Relation {
  @ManyToOne(() => Request, (request) => request.dislikes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'request_id' })
  request: Request;
}

@Entity('dislike', { schema: 'request' })
class DisLike extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Index('request_id-dislikeIdx')
  @Column()
  request_id: number;
}

export default DisLike;
