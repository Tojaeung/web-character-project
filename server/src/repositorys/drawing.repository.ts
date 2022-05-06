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
      .leftJoinAndSelect('drawing.comments', 'comment')
      .leftJoinAndSelect('comment.user', 'commentUser')
      .leftJoinAndSelect('drawing.likes', 'like')
      .leftJoinAndSelect('drawing.dislikes', 'dislike')
      .where('drawing.user_id = :userId', { userId })
      .orderBy('drawing.id', 'DESC')
      .limit(limit)
      .getMany();
  }
  getDrawingsByCursor(userId: number, cursor: number, limit: number) {
    return this.createQueryBuilder('drawing')
      .leftJoinAndSelect('drawing.user', 'drawingUser')
      .leftJoinAndSelect('drawing.comments', 'comment')
      .leftJoinAndSelect('comment.user', 'commentUser')
      .leftJoinAndSelect('drawing.likes', 'like')
      .leftJoinAndSelect('drawing.dislikes', 'dislike')
      .where('drawing.user_id = :userId', { userId })
      .andWhere('drawing.id < :cursor', { cursor })
      .orderBy('drawing.id', 'DESC')
      .limit(limit)
      .getMany();
  }

  // 그림생성시, 그림정보와 유저정보를 같이 보내주어야한다.
  joinUser(drawingId: number) {
    return this.createQueryBuilder('drawing')
      .leftJoinAndSelect('drawing.user', 'user')
      .where('drawing.id = :drawingId', { drawingId })
      .getOne();
  }

  create = async (content: string, url: string, key: string, id: number): Promise<Comment> => {
    const result = await this.createQueryBuilder('drawing')
      .insert()
      .into(Drawing)
      .values({ content, url, key, user_id: id })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  delete = async (drawingId: number) => {
    const result = await this.createQueryBuilder('drawing')
      .delete()
      .from(Drawing)
      .where('id = :id', { id: drawingId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(Comment)
export class DrawingCommentRepository extends AbstractRepository<Comment> {
  joinUser(commentId: number) {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id = :commentId', { commentId })
      .getOne();
  }
  create = async (id: number, drawingId: number, content: string): Promise<Comment> => {
    const result = await this.createQueryBuilder('comment')
      .insert()
      .into(Comment)
      .values({ user_id: id, drawing_id: drawingId, content })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  update = async (commentId: number, updatedContent: string): Promise<Comment> => {
    const result = await this.createQueryBuilder('comment')
      .update(Comment)
      .set({ content: updatedContent })
      .where('id = :id', { id: commentId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  delete = async (commentId: number): Promise<Comment> => {
    const result = await this.createQueryBuilder('comment')
      .delete()
      .from(Comment)
      .where('id = :id', { id: commentId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(Like)
export class LikeRepository extends AbstractRepository<Like> {
  create = async (id: number, drawingId: number): Promise<Like> => {
    const result = await this.createQueryBuilder('like')
      .insert()
      .into(Like)
      .values({ valuerId: id, drawing_id: drawingId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}
@EntityRepository(DisLike)
export class DisLikeRepository extends AbstractRepository<DisLike> {
  create = async (id: number, drawingId: number): Promise<DisLike> => {
    const result = await this.createQueryBuilder('like')
      .insert()
      .into(DisLike)
      .values({ valuerId: id, drawing_id: drawingId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}
