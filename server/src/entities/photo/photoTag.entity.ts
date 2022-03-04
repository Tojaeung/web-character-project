import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Photo } from './photo.entity';

@Entity('photoTag', { schema: 'photo' })
export class PhotoTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @Index('photo_id-photoTagIdx')
  @Column()
  photo_id: number;

  @ManyToOne(() => Photo, (photo) => photo.photoTags, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'photo_id' })
  photo: Photo;
}
