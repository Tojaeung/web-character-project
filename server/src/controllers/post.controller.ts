import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import logger from '@src/helpers/winston.helper';
import ApiError from '@src/errors/api.error';
import s3Delete from '@src/utils/s3.utils';
import { createImageKey, deleteImageKey } from '@src/utils/imagekey.utils';
import Post from '@src/entities/board/post.entity';
import Board from '@src/entities/board/board.entity';
import { CommentRepository, DisLikeRepository, LikeRepository, PostRepository } from '@src/repositorys/post.repository';
import Comment from '@src/entities/board/comment.entity';
import {
  CreateCommentDTO,
  CreateDisLikeDTO,
  CreateLikeDTO,
  CreatePostDTO,
  RemoveImageKeyDTO,
  UpdateCommentDTO,
  UpdatePostDTO,
} from '@src/schemas/board.schema';
import User from '@src/entities/user/user.entity';

export const getPost = async (req: Request, res: Response): Promise<any> => {
  const postRepo = getCustomRepository(PostRepository);

  const postId = Number(req.params.postId);

  const isExistingPost = await getRepository(Post).count({ id: postId });
  if (!isExistingPost) {
    logger.warn('존재하지 않는 게시글에 접근하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 게시글 입니다.');
  }

  // 게시물 조회수 증가
  await getRepository(Post).increment({ id: postId }, 'views', 1);
  const postJoinAll = await postRepo.joinAll(postId);

  logger.info(`${postId}번 게시글 가져오기 성공하였습니다.`);
  return res.status(200).json({ ok: true, message: '게시글 가져오기 성공하였습니다.', postJoinAll });
};

export const addImageKey = async (req: Request, res: Response): Promise<any> => {
  const imageUrl = (req.file as Express.MulterS3.File).location;
  const imageKey = (req.file as Express.MulterS3.File).key;

  if (!imageUrl || !imageKey) {
    logger.error('게시글 s3 이미지 업로드 실패하였습니다.');
    throw ApiError.InternalServerError('내부적인 문제로 이미지 업로드 실패하였습니다.');
  }

  logger.info('게시글 이미지 url 가져오기 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 이미지 url 가져오기 성공하였습니다.', imageUrl, imageKey });
};

export const removeImageKey = async (req: Request<{}, {}, RemoveImageKeyDTO['body']>, res: Response): Promise<any> => {
  const { imageKeys } = req.body;

  imageKeys.forEach((imageKey: string) => s3Delete(imageKey as string));

  logger.info('게시글 이미지 s3 board 객체 삭제 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 이미지 s3 board 객체 삭제 성공하였습니다.' });
};

export const createPost = async (
  req: Request<CreatePostDTO['params'], {}, CreatePostDTO['body']>,
  res: Response
): Promise<any> => {
  const postRepo = getCustomRepository(PostRepository);

  const id = req.session.user?.id!;
  const board = req.params.board;
  const { title, content, imageKeys } = req.body;

  // 유효하지 않는 게시판 예외처리
  const isExistingBoard = await getRepository(Board).findOne({ enName: board });
  if (!isExistingBoard) {
    logger.warn('존재하지 않는 게시판을 가져오려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }
  const boardId = isExistingBoard.id;

  const newPost = await postRepo.create(title, content, boardId, id);
  const newPostJoinAll = await postRepo.joinAll(newPost.id);

  // 이미지key s3에 저장
  imageKeys.length && (await createImageKey(imageKeys, id, newPost.id));

  logger.info('게시판 글쓰기 등록 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시판 글쓰기 성공하였습니다.', newPostJoinAll });
};

export const updatePost = async (
  req: Request<UpdatePostDTO['params'], {}, UpdatePostDTO['body']>,
  res: Response
): Promise<any> => {
  const postRepo = getCustomRepository(PostRepository);

  const id = req.session.user?.id!;
  const postId = Number(req.params.postId);
  const { title, content, imageKeys } = req.body;

  const isExistingPost = await getRepository(Post).count({ id: postId });
  if (!isExistingPost) {
    logger.warn('존재하지 않는 게시글을 수정하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 게시글을 수정할 수 없습니다..');
  }

  // s3 이미지 저장(새로운) 및 삭제(기존)
  if (imageKeys.length) {
    await deleteImageKey(id, postId);
    await createImageKey(imageKeys, id, postId);
  }

  const updatedPost = await postRepo.update(postId, title, content);
  const updatedPostJoinAll = await postRepo.joinAll(updatedPost.id);

  logger.info('게시글 수정 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 수정 성공하였습니다.', updatedPostJoinAll });
};

export const deletePost = async (req: Request, res: Response): Promise<any> => {
  const postRepo = getCustomRepository(PostRepository);

  const id = req.session.user?.id!;
  const postId = Number(req.params.postId);

  const isExistingPost = await getRepository(Post).count({ id: postId });
  if (!isExistingPost) {
    logger.warn('존재하지 않는 게시글을 삭제하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 게시글을 삭제 할 수 없습니다.');
  }

  // s3 이미지 삭제
  await deleteImageKey(id, postId);

  const deletedPost = await postRepo.delete(postId);

  logger.info('게시글 제거 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 제거 성공하였습니다.', deletedPost });
};

export const createComment = async (
  req: Request<CreateCommentDTO['params'], {}, CreateCommentDTO['body']>,
  res: Response
): Promise<any> => {
  const commentRepo = getCustomRepository(CommentRepository);

  const id = req.session.user?.id!;
  const board = req.params.board;
  const postId = Number(req.params.postId);
  const { content } = req.body;

  // 유효하지 않는 게시판 예외처리
  const isExistingBoard = await getRepository(Board).findOne({ enName: board });
  if (!isExistingBoard) {
    logger.warn('존재하지 않는 게시판을 가져오려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }
  const boardId = isExistingBoard.id;

  const isExistingPost = await getRepository(Post).count({ id: postId });
  if (!isExistingPost) {
    logger.warn('존재하지 않는 게시글에 댓글을 생성하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 게시글에 댓글을 달 수 없습니다.');
  }

  const newComment = await commentRepo.create(content, id, boardId, postId);
  const newCommentJoinUser = await commentRepo.joinUser(newComment.id);

  logger.info('게시글 댓글 생성 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 댓글 생성 성공하였습니다.', newCommentJoinUser });
};

export const updateComment = async (
  req: Request<UpdateCommentDTO['params'], {}, UpdateCommentDTO['body']>,
  res: Response
): Promise<any> => {
  const commentRepo = getCustomRepository(CommentRepository);

  const commentId = Number(req.params.commentId);
  const { updatedContent } = req.body;

  const isExistingComment = await getRepository(Comment).count({ id: commentId });
  if (!isExistingComment) {
    logger.warn('존재하지 않는 댓글을 수정하려고 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 댓글을 수정할 수 없습니다.');
  }

  const updatedComment = await commentRepo.update(updatedContent, commentId);
  const updatedCommentJoinUser = await commentRepo.joinUser(updatedComment.id);

  logger.info('게시글 댓글 수정 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 댓글 수정 성공하였습니다.', updatedCommentJoinUser });
};

export const deleteComment = async (req: Request, res: Response): Promise<any> => {
  const commentRepo = getCustomRepository(CommentRepository);

  const commentId = Number(req.params.commentId);

  const isExistingComment = await getRepository(Comment).count({ id: commentId });
  if (!isExistingComment) {
    logger.warn('존재하지 않는 댓글을 제거하려고 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 댓글을 제거할 수 없습니다.');
  }

  const deletedComment = await commentRepo.delete(commentId);

  logger.info('게시글 댓글 제거 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 댓글 제거 성공하였습니다.', deletedComment });
};

export const createLike = async (
  req: Request<CreateLikeDTO['params'], {}, CreateLikeDTO['body']>,
  res: Response
): Promise<any> => {
  const likeRepo = getCustomRepository(LikeRepository);

  const id = req.session.user?.id!;
  const postId = Number(req.params.postId);
  const { userId } = req.body; // 게시글 작성자 id

  const isExistingPost = await getRepository(Post).count({ id: postId });
  if (!isExistingPost) {
    logger.warn('존재하지 않는 게시글에 좋아요를 생성하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 게시글에 좋아요를 할 수 없습니다.');
  }

  const newLike = await likeRepo.create(id, postId);

  // 게시글 작성자는 좋아요를 받음에 따라 경험치(영감력)를 얻는다.
  await getRepository(User).increment({ id: userId }, 'exp', 5);

  logger.info('게시글 좋아요 생성 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 좋아요 생성 성공하였습니다.', newLike });
};

export const createDislike = async (
  req: Request<CreateDisLikeDTO['params'], {}, CreateDisLikeDTO['body']>,
  res: Response
): Promise<any> => {
  const dislikeRepo = getCustomRepository(DisLikeRepository);

  const id = req.session.user?.id!;
  const postId = Number(req.params.postId);
  const { userId } = req.body; // 게시글 작성자 id

  const isExistingPost = await getRepository(Post).count({ id: postId });
  if (!isExistingPost) {
    logger.warn('존재하지 않는 게시글에 싫어요를 생성하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 게시글에 싫어요를 할 수 없습니다.');
  }

  const newDisLike = await dislikeRepo.create(id, postId);

  // 게시글 작성자는 싫어요를 받음에 따라 경험치(영감력)가 깍인다.
  await getRepository(User).decrement({ id: userId }, 'exp', -2);

  logger.info('게시글 싫어요 생성 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 싫어요 생성 성공하였습니다.', newDisLike });
};
