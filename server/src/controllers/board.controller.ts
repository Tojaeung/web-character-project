import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import logger from '@src/helpers/winston.helper';
import {
  CreateCommentInput,
  CreateDisLikeInput,
  CreateLikeInput,
  CreatePostInput,
  DeleteCommentInput,
  DeleteImageKeyInput,
  DeletePostInput,
  GetBoardInput,
  GetPostInput,
  UpdateCommentInput,
  UpdatePostInput,
} from '@src/schemas/board.schema';
import ApiError from '@src/errors/api.error';
import { s3Delete } from '@src/utils/s3.utils';
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

import FreeDisLike from '@src/entities/board/free/dislike.entity';
import CommissionDisLike from '@src/entities/board/commission/dislike.entity';
import RequeDisLike from '@src/entities/board/reque/dislike.entity';
import SaleDisLike from '@src/entities/board/sale/dislike.entity';

import { createImageKey, deleteImageKey } from '@src/utils/imagekey.utils';
import User from '@src/entities/user/user.entity';

export const getAllBoards = async (req: Request, res: Response): Promise<any> => {
  const free = await getRepository(Free).find({ order: { id: 'DESC' }, take: 10 });
  const commission = await getRepository(Commission).find({ order: { id: 'DESC' }, take: 10 });
  const reque = await getRepository(Reque).find({ order: { id: 'DESC' }, take: 10 });
  const sale = await getRepository(Sale).find({ order: { id: 'DESC' }, take: 10 });

  logger.info('게시판 모두 가져오기 성공하였습니다.');
  return res.status(200).json({
    ok: true,
    message: '게시판 모두 가져오기 성공하였습니다.',
    free,
    commission,
    reque,
    sale,
  });
};

export const getBoard = async (
  req: Request<GetBoardInput['params'], GetBoardInput['query']>,
  res: Response
): Promise<any> => {
  const { board } = req.params;
  const { page, limit } = req.query;

  // 게시판 불러오기 시작점
  const offset = (Number(page) - 1) * Number(limit);
  // 가져온 게시물들
  let posts;
  // 게시판의 전체 게시물 수
  let totalPostsNum;

  if (board === 'free') {
    posts = await getRepository(Free).find({ order: { id: 'DESC' }, skip: offset, take: Number(limit) });
    totalPostsNum = await getRepository(Free).count();
  } else if (board === 'commission') {
    posts = await getRepository(Commission).find({ order: { id: 'DESC' }, skip: offset, take: Number(limit) });
    totalPostsNum = await getRepository(Commission).count();
  } else if (board === 'reque') {
    posts = await getRepository(Reque).find({ order: { id: 'DESC' }, skip: offset, take: Number(limit) });
    totalPostsNum = await getRepository(Reque).count();
  } else if (board === 'sale') {
    posts = await getRepository(Sale).find({ order: { id: 'DESC' }, skip: offset, take: Number(limit) });
    totalPostsNum = await getRepository(Sale).count();
  } else {
    logger.warn('존재하지 않는 게시판을 가져오려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info(`${board} 게시판 가져오기 성공하였습니다.`);
  return res.status(200).json({ ok: true, message: '게시판 가져오기 성공하였습니다.', posts, totalPostsNum });
};

export const getPost = async (req: Request<GetPostInput['params']>, res: Response): Promise<any> => {
  const { board, postId } = req.params;

  let post;
  if (board === 'free') {
    post = await getRepository(Free).findOne({ id: Number(postId) });
    // 조회수 증가
    await getRepository(Free).increment({ id: Number(postId) }, 'views', 1);
  } else if (board === 'commission') {
    post = await getRepository(Commission).findOne({ id: Number(postId) });
    // 조회수 증가
    await getRepository(Commission).increment({ id: Number(postId) }, 'views', 1);
  } else if (board === 'reque') {
    post = await getRepository(Reque).findOne({ id: Number(postId) });
    // 조회수 증가
    await getRepository(Reque).increment({ id: Number(postId) }, 'views', 1);
  } else if (board === 'sale') {
    post = await getRepository(Sale).findOne({ id: Number(postId) });
    // 조회수 증가
    await getRepository(Sale).increment({ id: Number(postId) }, 'views', 1);
  } else {
    logger.warn('존재하지 않는 게시글을 가져오려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시글입니다.');
  }

  logger.info(`${postId}번 게시글 가져오기 성공하였습니다.`);
  return res.status(200).json({ ok: true, message: '게시글 가져오기 성공하였습니다.', post });
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

export const removeImageKey = async (
  req: Request<{}, {}, DeleteImageKeyInput['body']>,
  res: Response
): Promise<any> => {
  const { imageKeys } = req.body;

  imageKeys.forEach((imageKey: string) => s3Delete(imageKey as string));

  logger.info('게시글 이미지 s3 board 객체 삭제 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 이미지 s3 board 객체 삭제 성공하였습니다.' });
};

export const createPost = async (
  req: Request<CreatePostInput['params'], {}, CreatePostInput['body']>,
  res: Response
): Promise<any> => {
  const id = req.session.user?.id!;
  const { board } = req.params;
  const { title, content, imageKeys } = req.body;

  let newPost;
  if (board === 'free') {
    newPost = await getRepository(Free).create({ title, content, user_id: id });
    // 이미지 저장
    createImageKey(board, imageKeys, id, newPost.id);
  } else if (board === 'commission') {
    newPost = await getRepository(Commission).create({ title, content, user_id: id });
    // 이미지 저장
    createImageKey(board, imageKeys, id, newPost.id);
  } else if (board === 'reque') {
    newPost = await getRepository(Reque).create({ title, content, user_id: id });
    // 이미지 저장
    createImageKey(board, imageKeys, id, newPost.id);
  } else if (board === 'sale') {
    newPost = await getRepository(Sale).create({ title, content, user_id: id });
    // 이미지 저장
    createImageKey(board, imageKeys, id, newPost.id);
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글을 생성하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info('게시판 글쓰기 등록 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시판 글쓰기 성공하였습니다.', newPost });
};

export const updatePost = async (
  req: Request<UpdatePostInput['params'], {}, UpdatePostInput['body']>,
  res: Response
): Promise<any> => {
  const id = req.session.user?.id!;
  const { board, postId } = req.params;
  const { title, content, imageKeys } = req.body;

  let updatedPost;
  if (board === 'free') {
    const result = await getRepository(Free).update(postId, { title, content });
    deleteImageKey(board, id, Number(postId));
    createImageKey(board, imageKeys, id, Number(postId));
    updatedPost = result.raw[0];
  } else if (board === 'commission') {
    const result = await getRepository(Commission).update(Number(postId), { title, content });
    deleteImageKey(board, id, Number(postId));
    createImageKey(board, imageKeys, id, Number(postId));
    updatedPost = result.raw[0];
  } else if (board === 'reque') {
    const result = await getRepository(Reque).update(Number(postId), { title, content });
    deleteImageKey(board, id, Number(postId));
    createImageKey(board, imageKeys, id, Number(postId));
    updatedPost = result.raw[0];
  } else if (board === 'sale') {
    const result = await getRepository(Sale).update(Number(postId), { title, content });
    deleteImageKey(board, id, Number(postId));
    createImageKey(board, imageKeys, id, Number(postId));
    updatedPost = result.raw[0];
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글을 수정하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info('게시글 수정 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 수정 성공하였습니다.', updatedPost });
};

export const deletePost = async (req: Request<DeletePostInput['params']>, res: Response): Promise<any> => {
  const id = req.session.user?.id!;
  const { board, postId } = req.params;

  let deletedPost;
  if (board === 'free') {
    const result = await getRepository(Free).delete({ id: Number(postId) });
    deleteImageKey(board, id, Number(postId));
    deletedPost = result.raw[0];
  } else if (board === 'commission') {
    const result = await getRepository(Commission).delete({ id: Number(postId) });
    deleteImageKey(board, id, Number(postId));
    deletedPost = result.raw[0];
  } else if (board === 'reque') {
    const result = await getRepository(Reque).delete({ id: Number(postId) });
    deleteImageKey(board, id, Number(postId));
    deletedPost = result.raw[0];
  } else if (board === 'sale') {
    const result = await getRepository(Sale).delete({ id: Number(postId) });
    deleteImageKey(board, id, Number(postId));
    deletedPost = result.raw[0];
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글을 삭제하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info('게시글 제거 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 제거 성공하였습니다.', deletedPost });
};

export const createComment = async (
  req: Request<CreateCommentInput['params'], {}, CreateCommentInput['body']>,
  res: Response
): Promise<any> => {
  const id = req.session.user?.id!;
  const { board, postId } = req.params;
  const { content } = req.body;

  let newComment;
  if (board === 'free') {
    const result = await getRepository(FreeComment).insert({ content, user_id: id, free_id: Number(postId) });
    newComment = result.raw[0];
  } else if (board === 'commission') {
    const result = await getRepository(CommissionComment).insert({
      content,
      user_id: id,
      commission_id: Number(postId),
    });
    newComment = result.raw[0];
  } else if (board === 'reque') {
    const result = await getRepository(RequeComment).insert({ content, user_id: id, reque_id: Number(postId) });
    newComment = result.raw[0];
  } else if (board === 'sale') {
    const result = await getRepository(SaleComment).insert({ content, user_id: id, sale_id: Number(postId) });
    newComment = result.raw[0];
  } else {
    logger.warn('존재하지 않는 게시판에서 댓글을 생성하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info('게시글 댓글 생성 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 댓글 생성 성공하였습니다.', newComment });
};

export const updateComment = async (
  req: Request<UpdateCommentInput['params'], {}, UpdateCommentInput['body']>,
  res: Response
): Promise<any> => {
  const { board, commentId } = req.params;
  const { content } = req.body;

  let updatedComment;
  if (board === 'free') {
    const result = await getRepository(FreeComment).update(commentId, { content });
    updatedComment = result.raw[0];
  } else if (board === 'commission') {
    const result = await getRepository(CommissionComment).update(commentId, { content });
    updatedComment = result.raw[0];
  } else if (board === 'reque') {
    const result = await getRepository(RequeComment).update(commentId, { content });
    updatedComment = result.raw[0];
  } else if (board === 'sale') {
    const result = await getRepository(SaleComment).update(commentId, { content });
    updatedComment = result.raw[0];
  } else {
    logger.warn('존재하지 않는 게시판에서 댓글을 수정하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info('게시글 댓글 수정 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 댓글 수정 성공하였습니다.', updatedComment });
};

export const deleteComment = async (req: Request<DeleteCommentInput['params']>, res: Response): Promise<any> => {
  const { board, commentId } = req.params;

  let deletedComment;
  if (board === 'free') {
    const result = await getRepository(FreeComment).delete({ id: Number(commentId) });
    deletedComment = result.raw[0];
  } else if (board === 'commission') {
    const result = await getRepository(CommissionComment).delete({ id: Number(commentId) });
    deletedComment = result.raw[0];
  } else if (board === 'reque') {
    const result = await getRepository(RequeComment).delete({ id: Number(commentId) });
    deletedComment = result.raw[0];
  } else if (board === 'sale') {
    const result = await getRepository(SaleComment).delete({ id: Number(commentId) });
    deletedComment = result.raw[0];
  } else {
    logger.warn('존재하지 않는 게시판에서 댓글을 제거하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info('게시글 댓글 제거 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 댓글 제거 성공하였습니다.', deletedComment });
};

export const createLike = async (req: Request<CreateLikeInput['params']>, res: Response): Promise<any> => {
  const id = req.session.user?.id!;
  const { board, postId } = req.params;

  let newLike;
  let authorId; // 게시글 작성자 id
  if (board === 'free') {
    const post = await getRepository(Free).findOne({ id });
    authorId = post?.user_id;
    const result = await getRepository(FreeLike).insert({ valuerId: id, free_id: Number(postId) });
    newLike = result.raw[0];
  } else if (board === 'commission') {
    const post = await getRepository(Commission).findOne({ id });
    authorId = post?.user_id;
    const result = await getRepository(CommissionLike).insert({ valuerId: id, commission_id: Number(postId) });
    newLike = result.raw[0];
  } else if (board === 'reque') {
    const post = await getRepository(Reque).findOne({ id });
    authorId = post?.user_id;
    const result = await getRepository(RequeLike).insert({ valuerId: id, reque_id: Number(postId) });
    newLike = result.raw[0];
  } else if (board === 'sale') {
    const post = await getRepository(Sale).findOne({ id });
    authorId = post?.user_id;
    const result = await getRepository(SaleLike).insert({ valuerId: id, sale_id: Number(postId) });
    newLike = result.raw[0];
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글에 좋아요를 생성하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  // 게시글 작성자는 좋아요를 받음에 따라 경험치(영감력)를 얻는다.
  await getRepository(User).increment({ id: authorId }, 'exp', 5);

  logger.info('게시글 좋아요 생성 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 좋아요 생성 성공하였습니다.', newLike });
};

export const createDisLike = async (req: Request<CreateDisLikeInput['params']>, res: Response): Promise<any> => {
  const id = req.session.user?.id!;
  const { board, postId } = req.params;

  let newDisLike;
  let authorId; // 게시글 작성자 id
  if (board === 'free') {
    const post = await getRepository(Free).findOne({ id });
    authorId = post?.user_id;
    const result = await getRepository(FreeDisLike).insert({ valuerId: id, free_id: Number(postId) });
    newDisLike = result.raw[0];
  } else if (board === 'commission') {
    const post = await getRepository(Commission).findOne({ id });
    authorId = post?.user_id;
    const result = await getRepository(CommissionDisLike).insert({ valuerId: id, commission_id: Number(postId) });
    newDisLike = result.raw[0];
  } else if (board === 'reque') {
    const post = await getRepository(Reque).findOne({ id });
    authorId = post?.user_id;
    const result = await getRepository(RequeDisLike).insert({ valuerId: id, reque_id: Number(postId) });
    newDisLike = result.raw[0];
  } else if (board === 'sale') {
    const post = await getRepository(Sale).findOne({ id });
    authorId = post?.user_id;
    const result = await getRepository(SaleDisLike).insert({ valuerId: id, sale_id: Number(postId) });
    newDisLike = result.raw[0];
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글에 좋아요를 생성하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  // 게시글 작성자는 싫어요를 받음에 따라 경험치(영감력)가 깍인다.
  await getRepository(User).decrement({ id: authorId }, 'exp', -2);

  logger.info('게시글 싫어요 생성 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 싫어요 생성 성공하였습니다.', newDisLike });
};
