import { AbstractRepository, EntityRepository } from 'typeorm';
import { Comment } from '@src/entities/photo/comment.entity';
import { Photo } from '@src/entities/photo/photo.entity';
import { PhotoTag } from '@src/entities/photo/photoTag.entity';

@EntityRepository(Photo)
export class PhotoRepository extends AbstractRepository<Photo> {
  findPhotoById(id: number) {
    return (
      this.createQueryBuilder('photo')
        .select('photo.id')
        .addSelect('photo.title')
        .addSelect('photo.url')
        .addSelect('photo.content')
        .addSelect('photo.createdAt')
        .addSelect('photo.updatedAt')
        .addSelect('photoTag.tag')
        .addSelect('comment.comment')
        .addSelect('user.nickname')
        // .addSelect('photo.comments')
        .leftJoin('photo.photoTags', 'photoTag')
        .leftJoin('photo.comments', 'comment')
        .leftJoin('comment.user', 'user')
        .where('photo.id = :id', { id })
        .getOne()
    );
  }
}

@EntityRepository(PhotoTag)
export class PhotoTagRepository extends AbstractRepository<PhotoTag> {
  findPhotoTagById(id: number) {
    return this.createQueryBuilder('photoTag').select('photoTag.tag').where('photo_id = :id', { id }).getOne();
  }
}

@EntityRepository(Comment)
export class CommentRepository extends AbstractRepository<Comment> {
  findPhotoTagById(id: number) {
    return this.createQueryBuilder('photoTag').select('photoTag.tag').where('photo_id = :id', { id }).getOne();
  }
}
