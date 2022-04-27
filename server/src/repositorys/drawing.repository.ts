import { AbstractRepository, EntityRepository } from 'typeorm';
import Drawing from '@src/entities/drawing/drawing.entity';
import Comment from '@src/entities/drawing/comment.entity';
import Like from '@src/entities/drawing/like.entity';
import DisLike from '@src/entities/drawing/dislike.entity';

@EntityRepository(Drawing)
export class DrawingRepository extends AbstractRepository<Drawing> {
  getDrawingsById(userId: number, limit: number) {
    return this.createQueryBuilder('drawing')
      .leftJoinAndSelect('drawing.user', 'drawingUser')
      .leftJoinAndSelect('drawing.drawingComments', 'drawingComment')
      .leftJoinAndSelect('drawingComment.user', 'drawingCommentUser')
      .leftJoinAndSelect('drawing.likes', 'like')
      .leftJoinAndSelect('drawing.dislikes', 'dislike')
      .where('drawing.user_id = :userId', { userId })
      .orderBy('drawing.id', 'DESC')
      .limit(limit)
      .getMany();
  }
  getDrawingsByCursor(userId: number, cursor: number, limit: number) {
    return this.createQueryBuilder('drawing')
      .leftJoinAndSelect('drawing.drawingComments', 'drawingComment')
      .leftJoinAndSelect('drawingComment.user', 'user')
      .leftJoinAndSelect('drawing.likes', 'like')
      .leftJoinAndSelect('drawing.dislikes', 'dislike')
      .where('drawing.user_id = :userId', { userId })
      .andWhere('drawing.id < :cursor', { cursor })
      .orderBy('drawing.id', 'DESC')
      .limit(limit)
      .getMany();
  }

  joinUser(drawingId: number) {
    return this.createQueryBuilder('drawing')
      .leftJoinAndSelect('drawing.user', 'user')
      .where('drawing.id = :drawingId', { drawingId })
      .getOne();
  }
}

@EntityRepository(Comment)
export class DrawingCommentRepository extends AbstractRepository<Comment> {
  joinUser(commentId: number) {
    return this.createQueryBuilder('drawingComment')
      .leftJoinAndSelect('drawingComment.user', 'user')
      .where('drawingComment.id = :commentId', { commentId })
      .getOne();
  }
}

@EntityRepository(Like)
export class LikeRepository extends AbstractRepository<Like> {}
@EntityRepository(DisLike)
export class DisLikeRepository extends AbstractRepository<DisLike> {}
