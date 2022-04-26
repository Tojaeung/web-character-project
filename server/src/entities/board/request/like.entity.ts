import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Request from '@src/entities/board/request/request.entity';

class Relation {
  @ManyToOne(() => Request, (request) => request.likes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'request_id' })
  request: Request;
}

@Entity('like', { schema: 'request' })
class Like extends Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Index('request_id-likeIdx')
  @Column()
  request_id: number;
}

export default Like;
