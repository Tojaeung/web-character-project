import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { Post } from '@src/entities/board/post.entity';
import { ImageKey } from '@src/entities/board/imageKey.entity';
import { PostComment } from '@src/entities/board/postComment.entity';
import { s3Delete } from '@src/utils/s3.utils';
import logger from '@src/helpers/winston.helper';
import { ImageKeyRepository, PostCommentRepository, PostRepository } from '@src/repositorys/board.repository';
import { Like } from '@src/entities/board/like.entity';
import { DisLike } from '@src/entities/board/dislike.entity';

const postController = {
  addView: async (req: Request, res: Response) => {
    const postRepo = getCustomRepository(PostRepository);
    try {
      const { postId } = req.body;

      const result = await postRepo.addPostView(postId as number);

      if (result.affected === 0) {
        logger.info('게시글 조회수 추가 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '게시판 조회수 추가 실패하였습니다.' });
      }

      logger.info('게시글 조회수 추가 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '게시판 조회수 추가 성공하였습니다.', postId });
    } catch (err: any) {
      logger.info('게시글 조회수 추가 에러', err);
      return res.status(500).json({ ok: false, message: '게시판 조회수 추가 에러' });
    }
  },
  getPost: async (req: Request, res: Response) => {
    const postRepo = getCustomRepository(PostRepository);
    try {
      const { postId } = req.body;

      const post = await postRepo.findPostById(postId as number);

      logger.info('게시판 글 가져오기 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '게시판 글 가져오기 성공하였습니다.', post });
    } catch (err: any) {
      logger.info('게시판 글 가져오기 에러', err);
      return res.status(500).json({ ok: false, message: '게시판 글 가져오기 에러' });
    }
  },
  imageUpload: async (req: Request, res: Response) => {
    try {
      const imageUrl = (req.file as Express.MulterS3.File).location;
      const imageKey = (req.file as Express.MulterS3.File).key;

      if (!imageUrl || !imageKey) {
        logger.info('s3 이미지 업로드 실패하였습니다.');
        return res.status(400).json({ ok: false, message: 's3 이미지 업로드 실패하였습니다.' });
      }

      logger.info('게시판 글쓰기 이미지 url 가져오기 성공하였습니다.');
      return res
        .status(200)
        .json({ ok: true, message: '게시판 글쓰기 이미지 url 가져오기 성공하였습니다.', imageUrl, imageKey });
    } catch (err: any) {
      logger.info('게시판 글쓰기 이미지 url 가져오기 에러', err);
      return res.status(500).json({ ok: false, message: '게시판 글쓰기 이미지 url 가져오기 에러' });
    }
  },
  imageRemove: async (req: Request, res: Response) => {
    try {
      const { imageKeys } = req.body;

      imageKeys.forEach((imageKey: string) => s3Delete(req, res, imageKey as string));

      logger.info('게시판 글쓰기 이미지 board 객체 삭제 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '게시판 글쓰기 이미지 board 객체 삭제 성공하였습니다.' });
    } catch (err: any) {
      logger.info('게시판 글쓰기 이미지 board 객체 삭제 에러', err);
      return res.status(500).json({ ok: false, message: '게시판 글쓰기 이미지 board 객체 삭제 에러' });
    }
  },
  addPost: async (req: Request, res: Response) => {
    try {
      const { title, content, board, imageKeys } = req.body;
      const { id } = req.session.user!;

      if (title.length > 50) {
        logger.info('게시글 제목을 입력글자가 초과되어 데이터에 추가 할 수 없습니다.');
        return res.status(400).json({ ok: false, message: '제목 글자 수를 초과하였습니다.' });
      } else if (!title.length) {
        logger.info('게시글 제목을 입력하지 않아서 데이터에 추가 할 수 없습니다.');
        return res.status(400).json({ ok: false, message: '제목을 입력해주세요.' });
      } else if (content.length > 10000) {
        logger.info('게시글 내용 입력글자가 초과되어 데이터에 추가 할 수 없습니다.');
        return res.status(400).json({ ok: false, message: '내용 글자 수를 초과하였습니다.' });
      } else if (!content.length || content === '<p><br></p>') {
        logger.info('게시글 내용을 입력하지 않아서 데이터에 추가 할 수 없습니다.');
        return res.status(400).json({ ok: false, message: '내용을 입력해주세요.' });
      }

      const post = new Post();
      post.board = board;
      post.title = title;
      post.content = content;
      post.user_id = id;
      await getRepository(Post).save(post);

      const image_key = new ImageKey();
      imageKeys.forEach(async (imageKey: string) => {
        image_key.user_id = post.user_id;
        image_key.post_id = post.id;
        image_key.image_key = imageKey;
        await getRepository(ImageKey).save(image_key);
      });
      logger.info('게시판 글쓰기 등록 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '게시판 글쓰기 성공하였습니다.', post });
    } catch (err: any) {
      logger.info('게시판 글쓰기 에러');
      return res.status(500).json({ ok: false, message: '게시판 글쓰기 에러' });
    }
  },

  editPost: async (req: Request, res: Response) => {
    const postRepo = getCustomRepository(PostRepository);
    try {
      const { postId, title, content, imageKeys } = req.body;

      const editedPost = await postRepo.findPostById(Number(postId));
      editedPost!.title = title;
      editedPost!.content = content;
      await getRepository(Post).save(editedPost!);

      const image_key = new ImageKey();
      imageKeys.forEach(async (imageKey: string) => {
        image_key.post_id = postId;
        image_key.image_key = imageKey;
        await getRepository(ImageKey).save(image_key);
      });
      logger.info('게시글 수정 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '게시글 수정 성공하였습니다.', editedPost });
    } catch (err: any) {
      logger.info('게시글 수정 에러');
      return res.status(500).json({ ok: false, message: '게시글 수정 에러' });
    }
  },

  removePost: async (req: Request, res: Response) => {
    const postRepo = getCustomRepository(PostRepository);
    const imageKeyRepo = getCustomRepository(ImageKeyRepository);
    try {
      const { postId } = req.params;

      await postRepo.removePost(Number(postId));

      // imageKey 불러와서 같이 s3삭제
      const imageKeys = await imageKeyRepo.findImageKeysByPostId(Number(postId));
      console.log(imageKeys);

      if (imageKeys.length !== 0) {
        imageKeys.forEach(async (imageKey) => {
          await imageKeyRepo.removeImageKeys(imageKey.id);
          s3Delete(req, res, imageKey.image_key as string);
        });
      }

      logger.info('게시글 제거 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '게시글 제거 성공하였습니다.' });
    } catch (err: any) {
      logger.info('게시글 제거 에러', err);
      return res.status(500).json({ ok: false, message: '게시글 제거 에러' });
    }
  },

  addComment: async (req: Request, res: Response) => {
    const postCommentRepo = getCustomRepository(PostCommentRepository);
    try {
      const { userId, postId, content } = req.body;

      if (content.length > 100) {
        logger.info('글자 수를 초과하였습니다.');
        return res.status(400).json({ ok: false, message: '글자 수를 초과하였습니다.' });
      } else if (!content.length) {
        logger.info('댓글을 입력해주세요.');
        return res.status(400).json({ ok: false, message: '댓글을 입력해주세요.' });
      }

      const postComment = new PostComment();
      postComment.user_id = userId;
      postComment.post_id = postId;
      postComment.content = content;
      await getRepository(PostComment).save(postComment);

      const newPostComment = await postCommentRepo.findPostComment(postComment.id);

      logger.info('게시판 댓글 등록 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '게시판 댓글 등록 성공하였습니다.', newPostComment });
    } catch (err: any) {
      logger.info('게시판 댓글 등록 에러', err);
      return res.status(500).json({ ok: false, message: '게시판 댓글 등록 에러' });
    }
  },
  removeComment: async (req: Request, res: Response) => {
    const postCommentRepo = getCustomRepository(PostCommentRepository);

    try {
      const { postCommentId } = req.params;

      const removedComment = await postCommentRepo.removePostComment(Number(postCommentId));

      if (removedComment.affected === 0) {
        logger.info('게시글 댓글 제거 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '게시글 댓글 제거 실패하였습니다.' });
      }

      logger.info('게시글 댓글 제거 성공하였습니다.');
      return res
        .status(200)
        .json({ ok: true, message: '게시글 댓글 제거 성공하였습니다.', removedCommentId: Number(postCommentId) });
    } catch (err: any) {
      logger.info('게시글 댓글 제거 에러', err);
      return res.status(500).json({ ok: false, message: '게시판 댓글 제거 에러' });
    }
  },

  editComment: async (req: Request, res: Response) => {
    const postCommentRepo = getCustomRepository(PostCommentRepository);

    try {
      const { postCommentId, editedContent } = req.body;

      const editedComment = await postCommentRepo.editPostComment(postCommentId, editedContent);

      if (editedComment.affected === 0) {
        logger.info('게시글 댓글 수정 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '게시글 댓글 수정 실패하였습니다.' });
      }

      logger.info('게시글 댓글 수정 성공하였습니다.');
      return res.status(200).json({
        ok: true,
        message: '게시글 댓글 수정 성공하였습니다.',
        editedCommentId: Number(postCommentId),
        editedContent: editedContent,
      });
    } catch (err: any) {
      logger.info('게시글 댓글 수정 에러', err);
      return res.status(500).json({ ok: false, message: '게시판 댓글 수정 에러' });
    }
  },

  addLike: async (req: Request, res: Response) => {
    try {
      const { userId, postId } = req.body;

      const addedLike = new Like();
      addedLike.user_id = userId;
      addedLike.post_id = postId;
      await getRepository(Like).save(addedLike);

      logger.info('게시글 좋아요 추가 성공하였습니다.');
      return res.status(200).json({
        ok: true,
        message: '게시글 좋아요 추가 성공하였습니다.',
        addedLike,
      });
    } catch (err: any) {
      logger.info('게시글 좋아요 추가 에러', err);
      return res.status(500).json({ ok: false, message: '게시글 좋아요 추가 에러' });
    }
  },
  addDisLike: async (req: Request, res: Response) => {
    try {
      const { userId, postId } = req.body;

      const addedDisLike = new DisLike();
      addedDisLike.user_id = userId;
      addedDisLike.post_id = postId;
      await getRepository(DisLike).save(addedDisLike);

      logger.info('게시글 싫어요 추가 성공하였습니다.');
      return res.status(200).json({
        ok: true,
        message: '게시글 싫어요 추가 성공하였습니다.',
        addedDisLike,
      });
    } catch (err: any) {
      logger.info('게시글 싫어요 추가  에러', err);
      return res.status(500).json({ ok: false, message: '게시판 싫어요 추가 에러' });
    }
  },
};

export default postController;
