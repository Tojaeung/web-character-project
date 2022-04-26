import { AbstractRepository, EntityRepository } from 'typeorm';
import { Drawing } from '@src/entities/drawing/drawing.entity';
import { Comment } from '@src/entities/drawing/drawingComment.entity';
import { Like } from '@src/entities/drawing/like.entity';
import { DisLike } from '@src/entities/drawing/dislike.entity';

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
      .where('drawing.user_id = :drawingId', { drawingId })
      .getOne();
  }

  getDrawingsNum(userId: number) {
    return this.createQueryBuilder('drawing').select('COUNT(*)').where('user_id = :id', { id: userId }).getRawOne();
  }

  findDrawingById(id: number) {
    return this.createQueryBuilder('drawing').where('user_id = :id', { id }).getMany();
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

  editDrawingComment(drawingCommentId: number, editedContent: string) {
    return this.createQueryBuilder('drawingComment')
      .update(Comment)
      .set({ content: editedContent })
      .where('id = :id', { id: drawingCommentId })
      .execute();
  }

  removeDrawingComment(drawingCommentId: number) {
    return this.createQueryBuilder('drawingComment')
      .delete()
      .from(Comment)
      .where('id = :id', { id: drawingCommentId })
      .execute();
  }

  getDrawingCommentsNum(userId: number) {
    return this.createQueryBuilder('drawingComment')
      .select('COUNT(*)')
      .where('user_id = :id', { id: userId })
      .getRawOne();
  }
}

@EntityRepository(Like)
export class LikeRepository extends AbstractRepository<Like> {
  removeDrawingLike(userId: number) {
    return this.createQueryBuilder('like').delete().from(Like).where('user_id = :userId', { userId }).execute();
  }
}
@EntityRepository(DisLike)
export class DisLikeRepository extends AbstractRepository<DisLike> {
  removeDrawingDisLike(userId: number) {
    return this.createQueryBuilder('dislike').delete().from(DisLike).where('user_id = :userId', { userId }).execute();
  }
}
