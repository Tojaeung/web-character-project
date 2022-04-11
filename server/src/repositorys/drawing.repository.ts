import { AbstractRepository, EntityRepository } from 'typeorm';
import { Drawing } from '@src/entities/drawing/drawing.entity';
import { DrawingComment } from '@src/entities/drawing/drawingComment.entity';
import { Like } from '@src/entities/drawing/like.entity';
import { DisLike } from '@src/entities/drawing/dislike.entity';

@EntityRepository(Drawing)
export class DrawingRepository extends AbstractRepository<Drawing> {
  getDrawingsById(profileId: number, drawingsLimit: number) {
    return this.createQueryBuilder('drawing')
      .leftJoinAndSelect('drawing.user', 'drawingUser')
      .leftJoinAndSelect('drawing.drawingComments', 'drawingComment')
      .leftJoinAndSelect('drawingComment.user', 'drawingCommentUser')
      .leftJoinAndSelect('drawing.likes', 'like')
      .leftJoinAndSelect('drawing.dislikes', 'dislike')
      .where('drawing.user_id = :profileId', { profileId })
      .orderBy('drawing.id', 'DESC')
      .limit(drawingsLimit)
      .getMany();
  }
  getDrawingsByCursor(profileId: number, cursor: number, drawingsLimit: number) {
    return this.createQueryBuilder('drawing')
      .leftJoinAndSelect('drawing.drawingComments', 'drawingComment')
      .leftJoinAndSelect('drawingComment.user', 'user')
      .leftJoinAndSelect('drawing.likes', 'like')
      .leftJoinAndSelect('drawing.dislikes', 'dislike')
      .where('drawing.user_id = :profileId', { profileId })
      .andWhere('drawing.id < :cursor', { cursor })
      .orderBy('drawing.id', 'DESC')
      .limit(drawingsLimit)
      .getMany();
  }

  addDrawingView(drawingId: number) {
    return this.createQueryBuilder('drawing')
      .update()
      .set({ views: () => 'views +1' })
      .where('id = :drawingId', { drawingId })
      .execute();
  }

  drawingJoinUser(drawingId: number) {
    return this.createQueryBuilder('drawing')
      .leftJoinAndSelect('drawing.user', 'user')
      .where('drawing.user_id = :drawingId', { drawingId })
      .getOne();
  }

  removeDrawing(drawingId: number) {
    return this.createQueryBuilder('drawing').delete().from(Drawing).where('id = :drawingId', { drawingId }).execute();
  }
}

@EntityRepository(DrawingComment)
export class DrawingCommentRepository extends AbstractRepository<DrawingComment> {
  drawingCommentJoinUser(drawingCommentId: number) {
    return this.createQueryBuilder('drawingComment')
      .leftJoinAndSelect('drawingComment.user', 'user')
      .where('drawingComment.id = :drawingCommentId', { drawingCommentId })
      .getOne();
  }

  editDrawingComment(drawingCommentId: number, editedContent: string) {
    return this.createQueryBuilder('drawingComment')
      .update(DrawingComment)
      .set({ content: editedContent })
      .where('id = :id', { id: drawingCommentId })
      .execute();
  }

  removeDrawingComment(drawingCommentId: number) {
    return this.createQueryBuilder('drawingComment')
      .delete()
      .from(DrawingComment)
      .where('id = :id', { id: drawingCommentId })
      .execute();
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
