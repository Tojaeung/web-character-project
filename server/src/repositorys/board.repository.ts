import { DisLike } from '@src/entities/board/dislike.entity';
import { ImageKey } from '@src/entities/board/imageKey.entity';
import { Like } from '@src/entities/board/like.entity';
import { Post } from '@src/entities/board/post.entity';
import { PostComment } from '@src/entities/board/postComment.entity';
import { AbstractRepository, EntityRepository } from 'typeorm';

@EntityRepository(Post)
export class PostRepository extends AbstractRepository<Post> {
  getFree() {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.board = :board', { board: 'free' })
      .orderBy('post.id', 'DESC')
      .limit(10)
      .getMany();
  }

  getDrawingCommission() {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.board = :board', { board: 'drawingCommission' })
      .orderBy('post.id', 'DESC')
      .limit(10)
      .getMany();
  }
  getDrawingRequest() {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.board = :board', { board: 'drawingRequest' })
      .orderBy('post.id', 'DESC')
      .limit(10)
      .getMany();
  }
  getDrawingSale() {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.board = :board', { board: 'drawingSale' })
      .orderBy('post.id', 'DESC')
      .limit(10)
      .getMany();
  }

  getSelectedBoard(board: string, offset: number, limit: number) {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.board = :board', { board })
      .orderBy('post.id', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();
  }

  addPostView(postId: number) {
    return this.createQueryBuilder('post')
      .update(Post)
      .set({ views: () => 'views +1' })
      .where('id =:id', { id: postId })
      .execute();
  }

  findPostById(postId: number) {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'postUser')
      .leftJoinAndSelect('post.postComments', 'postComment')
      .leftJoinAndSelect('postComment.user', 'postCommentUser')
      .leftJoinAndSelect('post.likes', 'like')
      .leftJoinAndSelect('post.dislikes', 'dislike')
      .where('post.id = :postId', { postId })
      .getOne();
  }

  CountPosts(board: string) {
    return this.createQueryBuilder('post').select('COUNT(*)').where('post.board = :board', { board }).getRawOne();
  }

  removePost(postId: number) {
    return this.createQueryBuilder('post').delete().from(Post).where('id = :id', { id: postId }).execute();
  }

  getPostsNum(userId: number) {
    return this.createQueryBuilder('post').select('COUNT(*)').where('user_id = :id', { id: userId }).getRawOne();
  }
}

@EntityRepository(PostComment)
export class PostCommentRepository extends AbstractRepository<PostComment> {
  findPostComment(postCommentId: number) {
    return this.createQueryBuilder('postComment')
      .leftJoinAndSelect('postComment.user', 'user')
      .where('postComment.id = :postCommentId', { postCommentId })
      .getOne();
  }

  removePostComment(postCommentId: number) {
    return this.createQueryBuilder('postComment')
      .delete()
      .from(PostComment)
      .where('id = :id', { id: postCommentId })
      .execute();
  }

  editPostComment(postCommentId: number, editedContent: string) {
    return this.createQueryBuilder('postComment')
      .update(PostComment)
      .set({ content: editedContent })
      .where('id = :id', { id: postCommentId })
      .execute();
  }
  getPostCommentsNum(userId: number) {
    return this.createQueryBuilder('postComment').select('COUNT(*)').where('user_id = :id', { id: userId }).getRawOne();
  }
}

@EntityRepository(Like)
export class LikeRepository extends AbstractRepository<Like> {
  removePostLike(userId: number) {
    return this.createQueryBuilder('postComment').delete().from(Like).where('user_id = :id', { id: userId }).execute();
  }
}

@EntityRepository(DisLike)
export class DisLikeRepository extends AbstractRepository<DisLike> {
  removePostDisLike(userId: number) {
    return this.createQueryBuilder('postComment')
      .delete()
      .from(DisLike)
      .where('user_id = :id', { id: userId })
      .execute();
  }
}

@EntityRepository(ImageKey)
export class ImageKeyRepository extends AbstractRepository<ImageKey> {
  findImageKeysByPostId(postId: number) {
    return this.createQueryBuilder('imageKey').where('post_id = :id', { id: postId }).getMany();
  }

  removeImageKeys(id: number) {
    return this.createQueryBuilder('imageKey').delete().from(ImageKey).where('id = :id', { id }).execute();
  }
}
