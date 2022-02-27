import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comment', { schema: 'profile' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  user_id: string;

  @Column()
  photo_id: string;

  @CreateDateColumn()
  createdAt: Date;
}
