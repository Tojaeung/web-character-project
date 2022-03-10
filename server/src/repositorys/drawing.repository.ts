import { AbstractRepository, EntityRepository } from 'typeorm';
import { Drawing } from '@src/entities/drawing/drawing.entity';
import { Comment } from '@src/entities/drawing/comment.entity';
import { Tag } from '@src/entities/drawing/tag.entity';

@EntityRepository(Drawing)
export class DrawingRepository extends AbstractRepository<Drawing> {
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

@EntityRepository(Tag)
export class TagRepository extends AbstractRepository<Tag> {
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
