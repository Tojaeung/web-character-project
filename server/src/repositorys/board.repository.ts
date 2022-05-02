import { AbstractRepository, EntityRepository } from 'typeorm';
import Free from '@src/entities/board/free/free.entity';
import Commission from '@src/entities/board/commission/commission.entity';
import Reque from '@src/entities/board/reque/reque.entity';
import Sale from '@src/entities/board/sale/sale.entity';
import FreeComment from '@src/entities/board/free/comment.entity';
import CommissionComment from '@src/entities/board/commission/comment.entity';
import RequeComment from '@src/entities/board/reque/comment.entity';
import SaleComment from '@src/entities/board/sale/comment.entity';
import FreeLike from '@src/entities/board/free/like.entity';
import CommissionLike from '@src/entities/board/commission/like.entity';
import RequeLike from '@src/entities/board/reque/like.entity';
import SaleLike from '@src/entities/board/sale/like.entity';
import FreeDislike from '@src/entities/board/free/dislike.entity';
import CommissionDislike from '@src/entities/board/commission/dislike.entity';
import RequeDislike from '@src/entities/board/reque/dislike.entity';
import SaleDislike from '@src/entities/board/sale/dislike.entity';

@EntityRepository(Free)
export class FreeRepository extends AbstractRepository<Free> {
  joinAll(postId: number) {
    return this.createQueryBuilder('free')
      .leftJoinAndSelect('free.user', 'user')
      .leftJoinAndSelect('free.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'commentUser')
      .leftJoinAndSelect('free.likes', 'likes')
      .leftJoinAndSelect('free.dislikes', 'dislikes')
      .where('free.id = :id', { id: postId })
      .getOne();
  }

  create = async (title: string, content: string, id: number): Promise<Free> => {
    const result = await this.createQueryBuilder('free')
      .insert()
      .into(Free)
      .values({ title, content, user_id: id })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  update = async (postId: number, title: string, content: string): Promise<Free> => {
    const result = await this.createQueryBuilder('free')
      .update(Free)
      .set({ title, content })
      .where('id = :id', { id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  delete = async (postId: number): Promise<Free> => {
    const result = await this.createQueryBuilder('free')
      .delete()
      .from(Free)
      .where('id = :id', { id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}
@EntityRepository(Commission)
export class CommissionRepository extends AbstractRepository<Commission> {
  joinAll(postId: number) {
    return this.createQueryBuilder('commission')
      .leftJoinAndSelect('commission.user', 'user')
      .leftJoinAndSelect('commission.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'commentUser')
      .leftJoinAndSelect('commission.likes', 'likes')
      .leftJoinAndSelect('commission.dislikes', 'dislikes')
      .where('commission.id = :id', { id: postId })
      .getOne();
  }
  create = async (title: string, content: string, id: number): Promise<Commission> => {
    const result = await this.createQueryBuilder('commission')
      .insert()
      .into(Commission)
      .values({ title, content, user_id: id })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  update = async (postId: number, title: string, content: string): Promise<Commission> => {
    const result = await this.createQueryBuilder('commission')
      .update(Commission)
      .set({ title, content })
      .where('id = :id', { id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  delete = async (postId: number): Promise<Commission> => {
    const result = await this.createQueryBuilder('commission')
      .delete()
      .from(Commission)
      .where('id = :id', { id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(Reque)
export class RequeRepository extends AbstractRepository<Reque> {
  joinAll(postId: number) {
    return this.createQueryBuilder('reque')
      .leftJoinAndSelect('reque.user', 'user')
      .leftJoinAndSelect('reque.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'commentUser')
      .leftJoinAndSelect('reque.likes', 'likes')
      .leftJoinAndSelect('reque.dislikes', 'dislikes')
      .where('reque.id = :id', { id: postId })
      .getOne();
  }

  create = async (title: string, content: string, id: number): Promise<Reque> => {
    const result = await this.createQueryBuilder('reque')
      .insert()
      .into(Reque)
      .values({ title, content, user_id: id })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  update = async (postId: number, title: string, content: string): Promise<Reque> => {
    const result = await this.createQueryBuilder('reque')
      .update(Reque)
      .set({ title, content })
      .where('id = :id', { id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  delete = async (postId: number): Promise<Reque> => {
    const result = await this.createQueryBuilder('reque')
      .delete()
      .from(Reque)
      .where('id = :id', { id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(Sale)
export class SaleRepository extends AbstractRepository<Sale> {
  joinAll(postId: number) {
    return this.createQueryBuilder('sale')
      .leftJoinAndSelect('sale.user', 'user')
      .leftJoinAndSelect('sale.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'commentUser')
      .leftJoinAndSelect('sale.likes', 'likes')
      .leftJoinAndSelect('sale.dislikes', 'dislikes')
      .where('sale.id = :id', { id: postId })
      .getOne();
  }

  create = async (title: string, content: string, id: number): Promise<Sale> => {
    const result = await this.createQueryBuilder('sale')
      .insert()
      .into(Sale)
      .values({ title, content, user_id: id })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  update = async (postId: number, title: string, content: string): Promise<Sale> => {
    const result = await this.createQueryBuilder('sale')
      .update(Sale)
      .set({ title, content })
      .where('id = :id', { id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
  delete = async (postId: number): Promise<Sale> => {
    const result = await this.createQueryBuilder('sale')
      .delete()
      .from(Sale)
      .where('id = :id', { id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(FreeComment)
export class FreeCommentRepository extends AbstractRepository<FreeComment> {
  joinUser(commentId: number) {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id = :commentId', { commentId })
      .getOne();
  }

  create = async (content: string, postId: number, id: number): Promise<FreeComment> => {
    const result = await this.createQueryBuilder('comment')
      .insert()
      .into(FreeComment)
      .values({ content, user_id: id, free_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  update = async (updatedContent: string, commentId: number): Promise<FreeComment> => {
    const result = await this.createQueryBuilder('comment')
      .update(FreeComment)
      .set({ content: updatedContent })
      .where('id = :id', { id: commentId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  delete = async (commentId: number): Promise<FreeComment> => {
    const result = await this.createQueryBuilder('comment')
      .delete()
      .from(FreeComment)
      .where('id = :id', { id: commentId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(CommissionComment)
export class CommissionCommentRepository extends AbstractRepository<CommissionComment> {
  joinUser(commentId: number) {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id = :commentId', { commentId })
      .getOne();
  }

  create = async (content: string, postId: number, id: number): Promise<CommissionComment> => {
    const result = await this.createQueryBuilder('comment')
      .insert()
      .into(CommissionComment)
      .values({ content, user_id: id, commission_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
  update = async (updatedContent: string, commentId: number): Promise<CommissionComment> => {
    const result = await this.createQueryBuilder('comment')
      .update(CommissionComment)
      .set({ content: updatedContent })
      .where('id = :id', { id: commentId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
  delete = async (commentId: number): Promise<CommissionComment> => {
    const result = await this.createQueryBuilder('comment')
      .delete()
      .from(CommissionComment)
      .where('id = :id', { id: commentId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(RequeComment)
export class RequeCommentRepository extends AbstractRepository<RequeComment> {
  joinUser(commentId: number) {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id = :commentId', { commentId })
      .getOne();
  }

  create = async (content: string, postId: number, id: number): Promise<RequeComment> => {
    const result = await this.createQueryBuilder('comment')
      .insert()
      .into(RequeComment)
      .values({ content, user_id: id, reque_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  update = async (updatedContent: string, commentId: number): Promise<RequeComment> => {
    const result = await this.createQueryBuilder('comment')
      .update(RequeComment)
      .set({ content: updatedContent })
      .where('id = :id', { id: commentId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  delete = async (commentId: number): Promise<RequeComment> => {
    const result = await this.createQueryBuilder('comment')
      .delete()
      .from(RequeComment)
      .where('id = :id', { id: commentId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(SaleComment)
export class SaleCommentRepository extends AbstractRepository<SaleComment> {
  joinUser(commentId: number) {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id = :commentId', { commentId })
      .getOne();
  }

  create = async (content: string, postId: number, id: number): Promise<SaleComment> => {
    const result = await this.createQueryBuilder('comment')
      .insert()
      .into(SaleComment)
      .values({ content, user_id: id, sale_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  update = async (updatedContent: string, commentId: number): Promise<SaleComment> => {
    const result = await this.createQueryBuilder('comment')
      .update(SaleComment)
      .set({ content: updatedContent })
      .where('id = :id', { id: commentId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  delete = async (commentId: number): Promise<SaleComment> => {
    const result = await this.createQueryBuilder('comment')
      .delete()
      .from(SaleComment)
      .where('id = :id', { id: commentId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(FreeLike)
export class FreeLikeRepository extends AbstractRepository<FreeLike> {
  create = async (valuerId: number, postId: number): Promise<FreeLike> => {
    const result = await this.createQueryBuilder('like')
      .insert()
      .into(FreeLike)
      .values({ valuerId, free_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(CommissionLike)
export class CommissionLikeRepository extends AbstractRepository<CommissionLike> {
  create = async (valuerId: number, postId: number): Promise<CommissionLike> => {
    const result = await this.createQueryBuilder('like')
      .insert()
      .into(CommissionLike)
      .values({ valuerId, commission_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(RequeLike)
export class RequeLikeRepository extends AbstractRepository<RequeLike> {
  create = async (valuerId: number, postId: number): Promise<RequeLike> => {
    const result = await this.createQueryBuilder('like')
      .insert()
      .into(RequeLike)
      .values({ valuerId, reque_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(SaleLike)
export class SaleLikeRepository extends AbstractRepository<SaleLike> {
  create = async (valuerId: number, postId: number): Promise<SaleLike> => {
    const result = await this.createQueryBuilder('like')
      .insert()
      .into(SaleLike)
      .values({ valuerId, sale_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(FreeDislike)
export class FreeDislikeRepository extends AbstractRepository<FreeDislike> {
  create = async (valuerId: number, postId: number): Promise<FreeDislike> => {
    const result = await this.createQueryBuilder('like')
      .insert()
      .into(FreeDislike)
      .values({ valuerId, free_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(CommissionDislike)
export class CommissionDislikeRepository extends AbstractRepository<CommissionDislike> {
  create = async (valuerId: number, postId: number): Promise<CommissionDislike> => {
    const result = await this.createQueryBuilder('like')
      .insert()
      .into(CommissionDislike)
      .values({ valuerId, commission_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(RequeDislike)
export class RequeDislikeRepository extends AbstractRepository<RequeDislike> {
  create = async (valuerId: number, postId: number): Promise<RequeDislike> => {
    const result = await this.createQueryBuilder('like')
      .insert()
      .into(RequeDislike)
      .values({ valuerId, reque_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(SaleDislike)
export class SaleDislikeRepository extends AbstractRepository<SaleDislike> {
  create = async (valuerId: number, postId: number): Promise<SaleDislike> => {
    const result = await this.createQueryBuilder('like')
      .insert()
      .into(SaleDislike)
      .values({ valuerId, sale_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}
