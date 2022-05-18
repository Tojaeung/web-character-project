import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('penalty', { schema: 'penalty' })
class Penalty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  expired_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default Penalty;
