import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import logger from '@src/helpers/winston.helper';
import ApiError from '@src/errors/api.error';
import { s3Delete } from '@src/utils/s3.utils';
import Free from '@src/entities/board/free/free.entity';
import Commission from '@src/entities/board/commission/commission.entity';
import Reque from '@src/entities/board/reque/reque.entity';
import Sale from '@src/entities/board/sale/sale.entity';
import { createImageKey, deleteImageKey } from '@src/utils/imagekey.utils';
import User from '@src/entities/user/user.entity';
import {
  CommissionRepository,
  FreeRepository,
  RequeRepository,
  SaleRepository,
  FreeCommentRepository,
  CommissionCommentRepository,
  RequeCommentRepository,
  SaleCommentRepository,
  FreeLikeRepository,
  CommissionLikeRepository,
  RequeLikeRepository,
  SaleLikeRepository,
  FreeDislikeRepository,
  CommissionDislikeRepository,
  RequeDislikeRepository,
  SaleDislikeRepository,
} from '@src/repositorys/board.repository';

export const getAllBoards = async (req: Request, res: Response): Promise<any> => {
  const free = await getRepository(Free).find({ order: { id: 'DESC' }, take: 10, relations: ['user'] });
  const commission = await getRepository(Commission).find({ order: { id: 'DESC' }, take: 10, relations: ['user'] });
  const reque = await getRepository(Reque).find({ order: { id: 'DESC' }, take: 10, relations: ['user'] });
  const sale = await getRepository(Sale).find({ order: { id: 'DESC' }, take: 10, relations: ['user'] });

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

export const getBoard = async (req: Request, res: Response): Promise<any> => {
  const { board } = req.params;
  const { page, limit } = req.query;

  // 게시판 불러오기 시작점
  const offset = (Number(page) - 1) * Number(limit);
  // 가져온 게시물들
  let posts;
  // 게시판의 전체 게시물 수
  let totalPostsNum;

  if (board === 'free') {
    posts = await getRepository(Free).find({ order: { id: 'DESC' }, skip: offset, take: Number(limit), relations: ['user'] });
    totalPostsNum = await getRepository(Free).count();
  } else if (board === 'commission') {
    posts = await getRepository(Commission).find({ order: { id: 'DESC' }, skip: offset, take: Number(limit), relations: ['user'] });
    totalPostsNum = await getRepository(Commission).count();
  } else if (board === 'reque') {
    posts = await getRepository(Reque).find({ order: { id: 'DESC' }, skip: offset, take: Number(limit), relations: ['user'] });
    totalPostsNum = await getRepository(Reque).count();
  } else if (board === 'sale') {
    posts = await getRepository(Sale).find({ order: { id: 'DESC' }, skip: offset, take: Number(limit), relations: ['user'] });
    totalPostsNum = await getRepository(Sale).count();
  } else {
    logger.warn('존재하지 않는 게시판을 가져오려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info(`${board} 게시판 가져오기 성공하였습니다.`);
  return res.status(200).json({ ok: true, message: '게시판 가져오기 성공하였습니다.', posts, totalPostsNum });
};

export const getPost = async (req: Request, res: Response): Promise<any> => {
  const freeRepo = getCustomRepository(FreeRepository);
  const commissionRepo = getCustomRepository(CommissionRepository);
  const requeRepo = getCustomRepository(RequeRepository);
  const saleRepo = getCustomRepository(SaleRepository);

  const { board, postId } = req.params;

  let postJoinAll;
  if (board === 'free') {
    postJoinAll = await freeRepo.joinAll(Number(postId));
    // 조회수 증가
    await getRepository(Free).increment({ id: Number(postId) }, 'views', 1);
  } else if (board === 'commission') {
    postJoinAll = await commissionRepo.joinAll(Number(postId));
    // 조회수 증가
    await getRepository(Commission).increment({ id: Number(postId) }, 'views', 1);
  } else if (board === 'reque') {
    postJoinAll = await requeRepo.joinAll(Number(postId));
    // 조회수 증가
    await getRepository(Reque).increment({ id: Number(postId) }, 'views', 1);
  } else if (board === 'sale') {
    postJoinAll = await saleRepo.joinAll(Number(postId));
    // 조회수 증가
    await getRepository(Sale).increment({ id: Number(postId) }, 'views', 1);
  } else {
    logger.warn('존재하지 않는 게시글을 가져오려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시글입니다.');
  }

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

export const removeImageKey = async (req: Request, res: Response): Promise<any> => {
  const { imageKeys } = req.body;

  imageKeys.forEach((imageKey: string) => s3Delete(imageKey as string));

  logger.info('게시글 이미지 s3 board 객체 삭제 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 이미지 s3 board 객체 삭제 성공하였습니다.' });
};

export const createPost = async (req: Request, res: Response): Promise<any> => {
  const freeRepo = getCustomRepository(FreeRepository);
  const commissionRepo = getCustomRepository(CommissionRepository);
  const requeRepo = getCustomRepository(RequeRepository);
  const saleRepo = getCustomRepository(SaleRepository);

  const id = req.session.user?.id!;
  const { board } = req.params;
  const { title, content, imageKeys } = req.body;

  let newPostJoinAll;
  if (board === 'free') {
    const newPost = await freeRepo.create(title, content, id);
    newPostJoinAll = await freeRepo.joinAll(newPost.id);
  } else if (board === 'commission') {
    const newPost = await commissionRepo.create(title, content, id);
    newPostJoinAll = await commissionRepo.joinAll(newPost.id);
  } else if (board === 'reque') {
    const newPost = await requeRepo.create(title, content, id);
    newPostJoinAll = await requeRepo.joinAll(newPost.id);
  } else if (board === 'sale') {
    const newPost = await saleRepo.create(title, content, id);
    newPostJoinAll = await saleRepo.joinAll(newPost.id);
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글을 생성하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  // s3 이미지 저장
  imageKeys.length > 0 && createImageKey(board, imageKeys, id, newPostJoinAll?.id!);

  logger.info('게시판 글쓰기 등록 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시판 글쓰기 성공하였습니다.', newPostJoinAll });
};

export const updatePost = async (req: Request, res: Response): Promise<any> => {
  const freeRepo = getCustomRepository(FreeRepository);
  const commissionRepo = getCustomRepository(CommissionRepository);
  const requeRepo = getCustomRepository(RequeRepository);
  const saleRepo = getCustomRepository(SaleRepository);

  const id = req.session.user?.id!;
  const { board, postId } = req.params;
  const { title, content, imageKeys } = req.body;

  let updatedPostJoinAll;
  if (board === 'free') {
    const updatedPost = await freeRepo.update(Number(postId), title, content);
    updatedPostJoinAll = await freeRepo.joinAll(Number(updatedPost.id));
  } else if (board === 'commission') {
    const updatedPost = await commissionRepo.update(Number(postId), title, content);
    updatedPostJoinAll = await commissionRepo.joinAll(Number(updatedPost.id));
  } else if (board === 'reque') {
    const updatedPost = await requeRepo.update(Number(postId), title, content);
    updatedPostJoinAll = await requeRepo.joinAll(Number(updatedPost.id));
  } else if (board === 'sale') {
    const updatedPost = await saleRepo.update(Number(postId), title, content);
    updatedPostJoinAll = await saleRepo.joinAll(Number(updatedPost.id));
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글을 수정하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  // s3 이미지 저장(새로운) 및 삭제(기존)
  if (imageKeys.length) {
    deleteImageKey(board, id, Number(postId));
    createImageKey(board, imageKeys, id, Number(postId));
  }

  logger.info('게시글 수정 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 수정 성공하였습니다.', updatedPostJoinAll });
};

export const deletePost = async (req: Request, res: Response): Promise<any> => {
  const freeRepo = getCustomRepository(FreeRepository);
  const commissionRepo = getCustomRepository(CommissionRepository);
  const requeRepo = getCustomRepository(RequeRepository);
  const saleRepo = getCustomRepository(SaleRepository);

  const id = req.session.user?.id!;
  const { board, postId } = req.params;

  let deletedPost;
  if (board === 'free') {
    deletedPost = await freeRepo.delete(Number(postId));
  } else if (board === 'commission') {
    deletedPost = await commissionRepo.delete(Number(postId));
  } else if (board === 'reque') {
    deletedPost = await requeRepo.delete(Number(postId));
  } else if (board === 'sale') {
    deletedPost = await saleRepo.delete(Number(postId));
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글을 삭제하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  // s3 이미지 삭제
  deleteImageKey(board, id, Number(postId));

  logger.info('게시글 제거 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 제거 성공하였습니다.', deletedPost });
};

export const createComment = async (req: Request, res: Response): Promise<any> => {
  const freeCommentRepo = getCustomRepository(FreeCommentRepository);
  const commissionCommentRepo = getCustomRepository(CommissionCommentRepository);
  const requeCommentRepo = getCustomRepository(RequeCommentRepository);
  const saleCommentRepo = getCustomRepository(SaleCommentRepository);

  const id = req.session.user?.id!;
  const { board, postId } = req.params;
  const { content } = req.body;

  let newCommentJoinUser;
  if (board === 'free') {
    const newComment = await freeCommentRepo.create(content, Number(postId), id);
    newCommentJoinUser = await freeCommentRepo.joinUser(newComment.id);
  } else if (board === 'commission') {
    const newComment = await commissionCommentRepo.create(content, Number(postId), id);
    newCommentJoinUser = await commissionCommentRepo.joinUser(newComment.id);
  } else if (board === 'reque') {
    const newComment = await requeCommentRepo.create(content, Number(postId), id);
    newCommentJoinUser = await requeCommentRepo.joinUser(newComment.id);
  } else if (board === 'sale') {
    const newComment = await saleCommentRepo.create(content, Number(postId), id);
    newCommentJoinUser = await saleCommentRepo.joinUser(newComment.id);
  } else {
    logger.warn('존재하지 않는 게시판에서 댓글을 생성하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info('게시글 댓글 생성 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 댓글 생성 성공하였습니다.', newCommentJoinUser });
};

export const updateComment = async (req: Request, res: Response): Promise<any> => {
  const freeCommentRepo = getCustomRepository(FreeCommentRepository);
  const commissionCommentRepo = getCustomRepository(CommissionCommentRepository);
  const requeCommentRepo = getCustomRepository(RequeCommentRepository);
  const saleCommentRepo = getCustomRepository(SaleCommentRepository);

  const { board, commentId } = req.params;
  const { updatedContent } = req.body;

  let updatedCommentJoinUser;
  if (board === 'free') {
    const updatedComment = await freeCommentRepo.update(updatedContent, Number(commentId));
    updatedCommentJoinUser = await freeCommentRepo.joinUser(updatedComment.id);
  } else if (board === 'commission') {
    const updatedComment = await commissionCommentRepo.update(updatedContent, Number(commentId));
    updatedCommentJoinUser = await commissionCommentRepo.joinUser(updatedComment.id);
  } else if (board === 'reque') {
    const updatedComment = await requeCommentRepo.update(updatedContent, Number(commentId));
    updatedCommentJoinUser = await requeCommentRepo.joinUser(updatedComment.id);
  } else if (board === 'sale') {
    const updatedComment = await saleCommentRepo.update(updatedContent, Number(commentId));
    updatedCommentJoinUser = await saleCommentRepo.joinUser(updatedComment.id);
  } else {
    logger.warn('존재하지 않는 게시판에서 댓글을 수정하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info('게시글 댓글 수정 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 댓글 수정 성공하였습니다.', updatedCommentJoinUser });
};

export const deleteComment = async (req: Request, res: Response): Promise<any> => {
  const freeCommentRepo = getCustomRepository(FreeCommentRepository);
  const commissionCommentRepo = getCustomRepository(CommissionCommentRepository);
  const requeCommentRepo = getCustomRepository(RequeCommentRepository);
  const saleCommentRepo = getCustomRepository(SaleCommentRepository);

  const { board, commentId } = req.params;

  let deletedComment;
  if (board === 'free') {
    deletedComment = await freeCommentRepo.delete(Number(commentId));
  } else if (board === 'commission') {
    deletedComment = await commissionCommentRepo.delete(Number(commentId));
  } else if (board === 'reque') {
    deletedComment = await requeCommentRepo.delete(Number(commentId));
  } else if (board === 'sale') {
    deletedComment = await saleCommentRepo.delete(Number(commentId));
  } else {
    logger.warn('존재하지 않는 게시판에서 댓글을 제거하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info('게시글 댓글 제거 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 댓글 제거 성공하였습니다.', deletedComment });
};

export const createLike = async (req: Request, res: Response): Promise<any> => {
  const freeLikeRepo = getCustomRepository(FreeLikeRepository);
  const commissionLikeRepo = getCustomRepository(CommissionLikeRepository);
  const requeLikeRepo = getCustomRepository(RequeLikeRepository);
  const saleLikeRepo = getCustomRepository(SaleLikeRepository);

  const id = req.session.user?.id!;
  const { board, postId } = req.params;
  const { userId } = req.body; // 게시글 작성자 id

  let newLike;
  if (board === 'free') {
    newLike = await freeLikeRepo.create(id, Number(postId));
  } else if (board === 'commission') {
    newLike = await commissionLikeRepo.create(id, Number(postId));
  } else if (board === 'reque') {
    newLike = await requeLikeRepo.create(id, Number(postId));
  } else if (board === 'sale') {
    newLike = await saleLikeRepo.create(id, Number(postId));
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글에 좋아요를 생성하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  // 게시글 작성자는 좋아요를 받음에 따라 경험치(영감력)를 얻는다.
  await getRepository(User).increment({ id: userId }, 'exp', 5);

  logger.info('게시글 좋아요 생성 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 좋아요 생성 성공하였습니다.', newLike });
};

export const createDislike = async (req: Request, res: Response): Promise<any> => {
  const freeDislikeRepo = getCustomRepository(FreeDislikeRepository);
  const commissionDislikeRepo = getCustomRepository(CommissionDislikeRepository);
  const requeDislikeRepo = getCustomRepository(RequeDislikeRepository);
  const saleDislikeRepo = getCustomRepository(SaleDislikeRepository);

  const id = req.session.user?.id!;
  const { board, postId } = req.params;
  const { userId } = req.body; // 게시글 작성자 id

  let newDisLike;
  if (board === 'free') {
    newDisLike = await freeDislikeRepo.create(id, Number(postId));
  } else if (board === 'commission') {
    newDisLike = await commissionDislikeRepo.create(id, Number(postId));
  } else if (board === 'reque') {
    newDisLike = await requeDislikeRepo.create(id, Number(postId));
  } else if (board === 'sale') {
    newDisLike = await saleDislikeRepo.create(id, Number(postId));
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글에 좋아요를 생성하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  // 게시글 작성자는 싫어요를 받음에 따라 경험치(영감력)가 깍인다.
  await getRepository(User).decrement({ id: userId }, 'exp', -2);

  logger.info('게시글 싫어요 생성 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 싫어요 생성 성공하였습니다.', newDisLike });
};
