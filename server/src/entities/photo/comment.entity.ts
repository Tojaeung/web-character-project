import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../profile/user.entity';
import { Photo } from './photo.entity';

@Entity('comment', { schema: 'photo' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Index('user_id-commentIdx')
  @Column()
  user_id: string;

  @Index('photo_id-commentIdx')
  @Column()
  photo_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Photo, (photo) => photo.comments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'photo_id' })
  photo: Photo;
}
