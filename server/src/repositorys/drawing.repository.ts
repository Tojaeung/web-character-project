import { AbstractRepository, EntityRepository } from 'typeorm';
import { Drawing } from '@src/entities/drawing/drawing.entity';
import { DrawingComment } from '@src/entities/drawing/drawingComment.entity';
import { Like } from '@src/entities/drawing/like.entity';
import { DisLike } from '@src/entities/drawing/dislike.entity';

@EntityRepository(Drawing)
export class DrawingRepository extends AbstractRepository<Drawing> {
  findDrawingByIdAndCursor(profileId: number, cursor: number) {
    return this.createQueryBuilder('drawing')
      .leftJoinAndSelect('drawing.drawingComments', 'drawingComment')
      .leftJoinAndSelect('drawingComment.user', 'user')
      .leftJoinAndSelect('drawing.likes', 'like')
      .leftJoinAndSelect('drawing.dislikes', 'dislike')
      .where('drawing.user_id = :profileId', { profileId })
      .andWhere('drawing.id < :cursor', { cursor })
      .orderBy('drawing.id', 'DESC')
      .limit(30)
      .getMany();
  }

  findDrawingById(profileId: number) {
    return this.createQueryBuilder('drawing')
      .leftJoinAndSelect('drawing.drawingComments', 'drawingComment')
      .leftJoinAndSelect('drawingComment.user', 'user')
      .leftJoinAndSelect('drawing.likes', 'like')
      .leftJoinAndSelect('drawing.dislikes', 'dislike')
      .where('drawing.user_id = :profileId', { profileId })
      .orderBy('drawing.id', 'DESC')
      .limit(30)
      .getMany();
  }

  addView(drawingId: number) {
    return this.createQueryBuilder('drawing')
      .update()
      .set({ views: () => 'views +1' })
      .where('id = :drawingId', { drawingId })
      .execute();
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
}

@EntityRepository(Like)
export class LikeRepository extends AbstractRepository<Like> {}
@EntityRepository(DisLike)
export class DisLikeRepository extends AbstractRepository<DisLike> {}
