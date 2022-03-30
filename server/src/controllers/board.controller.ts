import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { PostCommentRepository, PostRepository } from '@src/repositorys/board.repository';
import { s3 } from '@src/helpers/s3.helper';
import { Post } from '@src/entities/board/post.entity';
import { ImageKey } from '@src/entities/board/imageKey.entity';
import { PostComment } from '@src/entities/board/postComment.entity';
import logger from '@src/helpers/winston.helper';

const boardController = {
  getBoards: async (req: Request, res: Response) => {},
  getBoard: async (req: Request, res: Response) => {
    const postRepo = getCustomRepository(PostRepository);
    try {
      const { boardName } = req.body;

      const board = await postRepo.findBoard(boardName);

      logger.info('게시판 가져오기 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '게시판 가져오기 성공하였습니다.', boardName, board });
    } catch (err: any) {
      logger.info('게시판 가져오기 에러');
      return res.status(200).json({ ok: true, message: '게시판 가져오기 에러' });
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
      logger.info('게시판 글 가져오기 에러');
      return res.status(500).json({ ok: false, message: '게시판 글 가져오기 에러' });
    }
  },
  imageUpload: async (req: Request, res: Response) => {
    try {
      const imageUrl = (req.file as Express.MulterS3.File).location;
      const imageKey = (req.file as Express.MulterS3.File).key;
      console.log(imageUrl);
      console.log(imageKey);

      if (!imageUrl || !imageKey) {
        logger.info('s3 이미지 업로드 실패하였습니다.');
        return res.status(400).json({ ok: false, message: 's3 이미지 업로드 실패하였습니다.' });
      }

      logger.info('게시판 글쓰기 이미지 url 가져오기 성공하였습니다.');
      return res
        .status(200)
        .json({ ok: true, message: '게시판 글쓰기 이미지 url 가져오기 성공하였습니다.', imageUrl, imageKey });
    } catch (err: any) {
      logger.info('게시판 글쓰기 이미지 url 가져오기 에러');
      return res.status(500).json({ ok: false, message: '게시판 글쓰기 이미지 url 가져오기 에러' });
    }
  },
  imageRemove: async (req: Request, res: Response) => {
    try {
      const imageKeyArray = req.body;

      const bucketName = process.env.AWS_BUCKET_NAME as string;
      imageKeyArray.forEach((imageKey: string) => {
        s3.deleteObject({ Bucket: bucketName, Key: imageKey as string }, (err) => {
          if (err) {
            logger.warn('s3 board 객체삭제를 실패하였습니다.');
            return res.status(400).json({ ok: false, message: 's3 최적화 실패하였습니다.' });
          }
        });
      });

      logger.info('게시판 글쓰기 이미지 board 객체 삭제 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '게시판 글쓰기 이미지 board 객체 삭제 성공하였습니다.' });
    } catch (err: any) {
      logger.info('게시판 글쓰기 이미지 board 객체 삭제 에러');
      return res.status(500).json({ ok: false, message: '게시판 글쓰기 이미지 board 객체 삭제 에러' });
    }
  },
  addPost: async (req: Request, res: Response) => {
    try {
      const { title, content, board, imageKeys } = req.body;
      const { id } = req.session.user!;

      const post = new Post();
      post.board = board;
      post.title = title;
      post.content = content;
      post.user_id = id;
      await getRepository(Post).save(post);

      const image_key = new ImageKey();
      imageKeys.forEach(async (imageKey: string) => {
        image_key.post_id = post.id;
        image_key.image_key = imageKey;
        await getRepository(ImageKey).save(image_key);
      });
      logger.info('게시판 글쓰기 등록 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '게시판 글쓰기 등록 성공하였습니다.', post });
    } catch (err: any) {
      logger.info('게시판 글쓰기 등록 에러');
      return res.status(500).json({ ok: false, message: '게시판 글쓰기 등록 에러' });
    }
  },
  addPostComment: async (req: Request, res: Response) => {
    const postCommentRepo = getCustomRepository(PostCommentRepository);

    try {
      const { userId, postId, content } = req.body;

      const postComment = new PostComment();
      postComment.user_id = userId;
      postComment.post_id = postId;
      postComment.content = content;
      await getRepository(PostComment).save(postComment);

      const newPostComment = await postCommentRepo.findPostComment(postComment.id);

      logger.info('게시판 댓글 등록 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '게시판 댓글 등록 성공하였습니다.', newPostComment });
    } catch (err: any) {
      logger.info('게시판 댓글 등록 에러');
      return res.status(500).json({ ok: false, message: '게시판 댓글 등록 에러' });
    }
  },
};

export default boardController;
