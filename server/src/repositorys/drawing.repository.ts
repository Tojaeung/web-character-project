import { AbstractRepository, EntityRepository, getConnection } from 'typeorm';
import { Drawing } from '@src/entities/drawing/drawing.entity';
import { Comment } from '@src/entities/drawing/comment.entity';
import { Like } from '@src/entities/drawing/like.entity';
import { DisLike } from '@src/entities/drawing/dislike.entity';

@EntityRepository(Drawing)
export class DrawingRepository extends AbstractRepository<Drawing> {
  findDrawingByIdAndCursor(profileId: number, cursor: number) {
    return this.createQueryBuilder('drawing')
      .where('drawing.user_id = :profileId', { profileId })
      .andWhere('drawing.id < :cursor', { cursor })
      .orderBy('drawing.id', 'DESC')
      .limit(30)
      .getMany();
  }

  findDrawingById(profileId: number) {
    return this.createQueryBuilder('drawing')
      .where('drawing.user_id = :profileId', { profileId })
      .orderBy('drawing.id', 'DESC')
      .limit(30)
      .getMany();
  }

  addViews(drawingId: number) {
    return this.createQueryBuilder('drawing')
      .update()
      .set({ views: () => 'views +1' })
      .where('id = :drawingId', { drawingId })
      .execute();
  }

  getDrawing(drawingId: number) {
    return this.createQueryBuilder('drawing')
      .leftJoinAndSelect('drawing.comments', 'comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('drawing.likes', 'like')
      .leftJoinAndSelect('drawing.dislikes', 'dislike')
      .where('drawing.id = :drawingId', { drawingId })
      .orderBy('comment.created_at', 'DESC')
      .getOne();
  }
}

@EntityRepository(Comment)
export class CommentRepository extends AbstractRepository<Comment> {
  addComment(userId: number, drawingId: number, comment: string) {
    return this.createQueryBuilder('comment')
      .insert()
      .into(Comment)
      .values([{ comment: comment, user_id: userId, drawing_id: drawingId }])
      .execute();
  }

  findComment(id: number) {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id = :id', { id })
      .getOne();
  }
}

@EntityRepository(Like)
export class LikeRepository extends AbstractRepository<Like> {
  addLike(userId: number, drawingId: number) {
    return this.createQueryBuilder('like')
      .insert()
      .into(Like)
      .values([{ user_id: userId, drawing_id: drawingId }])
      .execute();
  }
  removeLike(userId: number) {
    return this.createQueryBuilder('like').delete().from(Like).where('user_id = :userId', { userId }).execute();
  }
}
@EntityRepository(DisLike)
export class DisLikeRepository extends AbstractRepository<DisLike> {
  addDisLike(userId: number, drawingId: number) {
    return this.createQueryBuilder('dislike')
      .insert()
      .into(DisLike)
      .values([{ user_id: userId, drawing_id: drawingId }])
      .execute();
  }
  removeDisLike(userId: number) {
    return this.createQueryBuilder('dislike').delete().from(DisLike).where('user_id = :userId', { userId }).execute();
  }
}
