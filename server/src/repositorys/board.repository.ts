import { DisLike } from '@src/entities/board/dislike.entity';
import { ImageKey } from '@src/entities/board/imageKey.entity';
import { Like } from '@src/entities/board/like.entity';
import { Post } from '@src/entities/board/post.entity';
import { PostComment } from '@src/entities/board/postComment.entity';
import { AbstractRepository, EntityRepository } from 'typeorm';

@EntityRepository(Post)
export class PostRepository extends AbstractRepository<Post> {
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

  findBoard(board: string) {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.postComments', 'postComment')
      .leftJoinAndSelect('post.likes', 'like')
      .leftJoinAndSelect('post.dislikes', 'dislike')
      .where('post.board = :board', { board })
      .orderBy('post.created_at', 'DESC')
      .getMany();
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
