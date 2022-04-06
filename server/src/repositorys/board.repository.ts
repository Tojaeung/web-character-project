import { DisLike } from '@src/entities/board/dislike.entity';
import { ImageKey } from '@src/entities/board/imageKey.entity';
import { Like } from '@src/entities/board/like.entity';
import { Post } from '@src/entities/board/post.entity';
import { PostComment } from '@src/entities/board/postComment.entity';
import { AbstractRepository, EntityRepository } from 'typeorm';

@EntityRepository(Post)
export class PostRepository extends AbstractRepository<Post> {
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
      .leftJoinAndSelect('post.postComments', 'postComment')
      .leftJoinAndSelect('post.likes', 'like')
      .leftJoinAndSelect('post.dislikes', 'dislike')
      .where('post.board = :board', { board })
      .orderBy('post.id', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();
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
}

@EntityRepository(PostComment)
export class PostCommentRepository extends AbstractRepository<PostComment> {
  findPostComment(postCommentId: number) {
    return this.createQueryBuilder('postComment')
      .leftJoinAndSelect('postComment.user', 'user')
      .where('postComment.id = :postCommentId', { postCommentId })
      .getOne();
  }
}

@EntityRepository(Like)
export class LikeRepository extends AbstractRepository<Like> {}

@EntityRepository(DisLike)
export class DisLikeRepository extends AbstractRepository<DisLike> {}

@EntityRepository(ImageKey)
export class ImageKeyRepository extends AbstractRepository<ImageKey> {}
