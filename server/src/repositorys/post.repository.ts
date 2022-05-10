import { AbstractRepository, EntityRepository } from 'typeorm';
import Post from '@src/entities/board/post.entity';
import Comment from '@src/entities/board/comment.entity';
import Like from '@src/entities/board/like.entity';
import DisLike from '@src/entities/board/dislike.entity';

@EntityRepository(Post)
export class PostRepository extends AbstractRepository<Post> {
  joinAll(postId: number) {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.board', 'board')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'commentUser')
      .leftJoinAndSelect('post.likes', 'likes')
      .leftJoinAndSelect('post.dislikes', 'dislikes')
      .where('post.id = :id', { id: postId })
      .getOne();
  }

  create = async (title: string, content: string, boardId: number, id: number): Promise<Post> => {
    const result = await this.createQueryBuilder('post')
      .insert()
      .into(Post)
      .values({ title, content, user_id: id, board_id: boardId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  update = async (postId: number, title: string, content: string): Promise<Post> => {
    const result = await this.createQueryBuilder('post')
      .update(Post)
      .set({ title, content })
      .where('id = :id', { id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  delete = async (postId: number): Promise<Post> => {
    const result = await this.createQueryBuilder('post')
      .delete()
      .from(Post)
      .where('id = :id', { id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(Comment)
export class CommentRepository extends AbstractRepository<Comment> {
  joinUser(commentId: number) {
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.id = :commentId', { commentId })
      .getOne();
  }

  create = async (content: string, id: number, boardId: number, postId: number): Promise<Comment> => {
    const result = await this.createQueryBuilder('comment')
      .insert()
      .into(Comment)
      .values({ content, user_id: id, board_id: boardId, post_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };

  update = async (updatedContent: string, commentId: number): Promise<Comment> => {
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
  create = async (userId: number, postId: number): Promise<Like> => {
    const result = await this.createQueryBuilder('like')
      .insert()
      .into(Like)
      .values({ userId, post_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}

@EntityRepository(DisLike)
export class DisLikeRepository extends AbstractRepository<DisLike> {
  create = async (userId: number, postId: number): Promise<DisLike> => {
    const result = await this.createQueryBuilder('dislike')
      .insert()
      .into(DisLike)
      .values({ userId, post_id: postId })
      .returning('*')
      .execute();
    return result.raw[0];
  };
}
