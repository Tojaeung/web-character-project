import { Request, Response } from 'express';
import { getCustomRepository, getRepository, ILike } from 'typeorm';
import _ from 'lodash';
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
import {
  CreateCommentDTO,
  CreateDisLikeDTO,
  CreateLikeDTO,
  CreatePostDTO,
  RemoveImageKeyDTO,
  UpdateCommentDTO,
  UpdatePostDTO,
} from '@src/schemas/board.schema';

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
  const page = Number(req.query.page as string) || 1;
  const limit = Number(req.query.limit as string) || 10;

  const searchType = req.query.searchType as string;
  const keyword = req.query.keyword as string;

  // 유효한 게시판 종류
  const boardOptions = ['free', 'commission', 'reque', 'sale'];

  // 게시판 불러오기 시작점
  const offset = (page - 1) * limit;
  // 가져온 게시물들
  let posts;
  // 게시판의 전체 게시물 수
  let totalPostsNum;

  // 유효하지 않는 게시판 예외처리
  if (!boardOptions.includes(board)) {
    logger.warn('존재하지 않는 게시판을 가져오려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  // 검색없이 게시판 페이지네이션
  if (!searchType || !keyword) {
    posts = await getRepository(_.upperFirst(board)).find({
      order: { id: 'DESC' },
      skip: offset,
      take: limit,
      relations: ['user'],
    });
    totalPostsNum = await getRepository(_.upperFirst(board)).count();

    logger.info(`${board} 게시판 가져오기 성공하였습니다.`);
    return res.status(200).json({ ok: true, message: '게시판 가져오기 성공하였습니다.', posts, totalPostsNum });
  }

  // 게시판내, 검색으로 정보 가져오기
  if (searchType === 'title') {
    posts = await getRepository(_.upperFirst(board)).find({
      order: { id: 'DESC' },
      skip: offset,
      take: limit,
      where: { title: ILike(`%${keyword}%`) },
      relations: ['user'],
    });
    totalPostsNum = await getRepository(_.upperFirst(board)).count({
      where: { title: ILike(`%${keyword}%`) },
    });
  } else if (searchType === 'content') {
    posts = await getRepository(_.upperFirst(board)).find({
      order: { id: 'DESC' },
      skip: offset,
      take: limit,
      where: { content: ILike(`%${keyword}%`) },
      relations: ['user'],
    });
    totalPostsNum = await getRepository(_.upperFirst(board)).count({
      where: { content: ILike(`%${keyword}%`) },
    });
  } else if (searchType === 'nickname') {
    posts = await getRepository(_.upperFirst(board)).find({
      order: { id: 'DESC' },
      skip: offset,
      take: limit,
      where: { nickname: ILike(`%${keyword}%`) },
      relations: ['user'],
    });
    totalPostsNum = await getRepository(_.upperFirst(board)).count({
      where: { nickname: ILike(`%${keyword}%`) },
    });
  } else {
    logger.warn('존재하지 않는 검색기준으로 정보를 불러오는 시도가 있습니다.');
    throw ApiError.BadRequest('존재하지 않는 검색기준입니다.');
  }

  logger.info(`${board} 게시판에서 "${keyword}"로 검색한 정보를 가져오기 성공하였습니다.`);
  return res
    .status(200)
    .json({ ok: true, message: `"${keyword}"로 검색한 게시판 가져오기 성공하였습니다.`, posts, totalPostsNum });
};

export const getPost = async (req: Request, res: Response): Promise<any> => {
  const freeRepo = getCustomRepository(FreeRepository);
  const commissionRepo = getCustomRepository(CommissionRepository);
  const requeRepo = getCustomRepository(RequeRepository);
  const saleRepo = getCustomRepository(SaleRepository);

  const board = req.params.board;
  const postId = Number(req.params.postId);

  const isExistingPost = await getRepository(_.upperFirst(board)).count({ id: postId });
  if (!isExistingPost) {
    logger.warn('존재하지 않는 게시글에 접근하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 게시글 입니다.');
  }

  let postJoinAll;
  if (board === 'free') {
    postJoinAll = await freeRepo.joinAll(postId);
    // 조회수 증가
    await getRepository(Free).increment({ id: postId }, 'views', 1);
  } else if (board === 'commission') {
    postJoinAll = await commissionRepo.joinAll(postId);
    // 조회수 증가
    await getRepository(Commission).increment({ id: postId }, 'views', 1);
  } else if (board === 'reque') {
    postJoinAll = await requeRepo.joinAll(postId);
    // 조회수 증가
    await getRepository(Reque).increment({ id: postId }, 'views', 1);
  } else if (board === 'sale') {
    postJoinAll = await saleRepo.joinAll(postId);
    // 조회수 증가
    await getRepository(Sale).increment({ id: postId }, 'views', 1);
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
  const freeRepo = getCustomRepository(FreeRepository);
  const commissionRepo = getCustomRepository(CommissionRepository);
  const requeRepo = getCustomRepository(RequeRepository);
  const saleRepo = getCustomRepository(SaleRepository);

  const id = req.session.user?.id!;
  const board = req.params.board;
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

export const updatePost = async (
  req: Request<UpdatePostDTO['params'], {}, UpdatePostDTO['body']>,
  res: Response
): Promise<any> => {
  const freeRepo = getCustomRepository(FreeRepository);
  const commissionRepo = getCustomRepository(CommissionRepository);
  const requeRepo = getCustomRepository(RequeRepository);
  const saleRepo = getCustomRepository(SaleRepository);

  const id = req.session.user?.id!;
  const board = req.params.board;
  const postId = Number(req.params.postId);
  const { title, content, imageKeys } = req.body;

  const isExistingPost = await getRepository(_.upperFirst(board)).count({ id: postId });
  if (!isExistingPost) {
    logger.warn('존재하지 않는 게시글을 수정하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 게시글을 수정할 수 없습니다..');
  }

  let updatedPostJoinAll;
  if (board === 'free') {
    const updatedPost = await freeRepo.update(postId, title, content);
    updatedPostJoinAll = await freeRepo.joinAll(updatedPost.id);
  } else if (board === 'commission') {
    const updatedPost = await commissionRepo.update(postId, title, content);
    updatedPostJoinAll = await commissionRepo.joinAll(updatedPost.id);
  } else if (board === 'reque') {
    const updatedPost = await requeRepo.update(postId, title, content);
    updatedPostJoinAll = await requeRepo.joinAll(updatedPost.id);
  } else if (board === 'sale') {
    const updatedPost = await saleRepo.update(postId, title, content);
    updatedPostJoinAll = await saleRepo.joinAll(updatedPost.id);
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글을 수정하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  // s3 이미지 저장(새로운) 및 삭제(기존)
  if (imageKeys.length) {
    deleteImageKey(board, id, postId);
    createImageKey(board, imageKeys, id, postId);
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
  const board = req.params.board;
  const postId = Number(req.params.postId);

  const isExistingPost = await getRepository(_.upperFirst(board)).count({ id: postId });
  if (!isExistingPost) {
    logger.warn('존재하지 않는 게시글을 삭제하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 게시글을 삭제 할 수 없습니다.');
  }

  let deletedPost;
  if (board === 'free') {
    deletedPost = await freeRepo.delete(postId);
  } else if (board === 'commission') {
    deletedPost = await commissionRepo.delete(postId);
  } else if (board === 'reque') {
    deletedPost = await requeRepo.delete(postId);
  } else if (board === 'sale') {
    deletedPost = await saleRepo.delete(postId);
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글을 삭제하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  // s3 이미지 삭제
  deleteImageKey(board, id, postId);

  logger.info('게시글 제거 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 제거 성공하였습니다.', deletedPost });
};

export const createComment = async (
  req: Request<CreateCommentDTO['params'], {}, CreateCommentDTO['body']>,
  res: Response
): Promise<any> => {
  const freeCommentRepo = getCustomRepository(FreeCommentRepository);
  const commissionCommentRepo = getCustomRepository(CommissionCommentRepository);
  const requeCommentRepo = getCustomRepository(RequeCommentRepository);
  const saleCommentRepo = getCustomRepository(SaleCommentRepository);

  const id = req.session.user?.id!;
  const board = req.params.board;
  const postId = Number(req.params.postId);
  const { content } = req.body;

  const isExistingPost = await getRepository(_.upperFirst(board)).count({ id: postId });
  if (!isExistingPost) {
    logger.warn('존재하지 않는 게시글에 댓글을 생성하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 게시글에 댓글을 달 수 없습니다.');
  }

  let newCommentJoinUser;
  if (board === 'free') {
    const newComment = await freeCommentRepo.create(content, postId, id);
    newCommentJoinUser = await freeCommentRepo.joinUser(newComment.id);
  } else if (board === 'commission') {
    const newComment = await commissionCommentRepo.create(content, postId, id);
    newCommentJoinUser = await commissionCommentRepo.joinUser(newComment.id);
  } else if (board === 'reque') {
    const newComment = await requeCommentRepo.create(content, postId, id);
    newCommentJoinUser = await requeCommentRepo.joinUser(newComment.id);
  } else if (board === 'sale') {
    const newComment = await saleCommentRepo.create(content, postId, id);
    newCommentJoinUser = await saleCommentRepo.joinUser(newComment.id);
  } else {
    logger.warn('존재하지 않는 게시판에서 댓글을 생성하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info('게시글 댓글 생성 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 댓글 생성 성공하였습니다.', newCommentJoinUser });
};

export const updateComment = async (
  req: Request<UpdateCommentDTO['params'], {}, UpdateCommentDTO['body']>,
  res: Response
): Promise<any> => {
  const freeCommentRepo = getCustomRepository(FreeCommentRepository);
  const commissionCommentRepo = getCustomRepository(CommissionCommentRepository);
  const requeCommentRepo = getCustomRepository(RequeCommentRepository);
  const saleCommentRepo = getCustomRepository(SaleCommentRepository);

  const board = req.params.board;
  const commentId = Number(req.params.commentId);
  const { updatedContent } = req.body;

  let updatedCommentJoinUser;
  if (board === 'free') {
    const updatedComment = await freeCommentRepo.update(updatedContent, commentId);
    updatedCommentJoinUser = await freeCommentRepo.joinUser(updatedComment.id);
  } else if (board === 'commission') {
    const updatedComment = await commissionCommentRepo.update(updatedContent, commentId);
    updatedCommentJoinUser = await commissionCommentRepo.joinUser(updatedComment.id);
  } else if (board === 'reque') {
    const updatedComment = await requeCommentRepo.update(updatedContent, commentId);
    updatedCommentJoinUser = await requeCommentRepo.joinUser(updatedComment.id);
  } else if (board === 'sale') {
    const updatedComment = await saleCommentRepo.update(updatedContent, commentId);
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

  const board = req.params.board;
  const commentId = Number(req.params.commentId);

  let deletedComment;
  if (board === 'free') {
    deletedComment = await freeCommentRepo.delete(commentId);
  } else if (board === 'commission') {
    deletedComment = await commissionCommentRepo.delete(commentId);
  } else if (board === 'reque') {
    deletedComment = await requeCommentRepo.delete(commentId);
  } else if (board === 'sale') {
    deletedComment = await saleCommentRepo.delete(commentId);
  } else {
    logger.warn('존재하지 않는 게시판에서 댓글을 제거하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  logger.info('게시글 댓글 제거 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 댓글 제거 성공하였습니다.', deletedComment });
};

export const createLike = async (
  req: Request<CreateLikeDTO['params'], {}, CreateLikeDTO['body']>,
  res: Response
): Promise<any> => {
  const freeLikeRepo = getCustomRepository(FreeLikeRepository);
  const commissionLikeRepo = getCustomRepository(CommissionLikeRepository);
  const requeLikeRepo = getCustomRepository(RequeLikeRepository);
  const saleLikeRepo = getCustomRepository(SaleLikeRepository);

  const id = req.session.user?.id!;
  const board = req.params.board;
  const postId = Number(req.params.postId);
  const { userId } = req.body; // 게시글 작성자 id

  const isExistingPost = await getRepository(_.upperFirst(board)).count({ id: postId });
  if (!isExistingPost) {
    logger.warn('존재하지 않는 게시글에 좋아요를 생성하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 게시글에 좋아요를 할 수 없습니다.');
  }

  let newLike;
  if (board === 'free') {
    newLike = await freeLikeRepo.create(id, postId);
  } else if (board === 'commission') {
    newLike = await commissionLikeRepo.create(id, postId);
  } else if (board === 'reque') {
    newLike = await requeLikeRepo.create(id, postId);
  } else if (board === 'sale') {
    newLike = await saleLikeRepo.create(id, postId);
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글에 좋아요를 생성하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  // 게시글 작성자는 좋아요를 받음에 따라 경험치(영감력)를 얻는다.
  await getRepository(User).increment({ id: userId }, 'exp', 5);

  logger.info('게시글 좋아요 생성 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 좋아요 생성 성공하였습니다.', newLike });
};

export const createDislike = async (
  req: Request<CreateDisLikeDTO['params'], {}, CreateDisLikeDTO['body']>,
  res: Response
): Promise<any> => {
  const freeDislikeRepo = getCustomRepository(FreeDislikeRepository);
  const commissionDislikeRepo = getCustomRepository(CommissionDislikeRepository);
  const requeDislikeRepo = getCustomRepository(RequeDislikeRepository);
  const saleDislikeRepo = getCustomRepository(SaleDislikeRepository);

  const id = req.session.user?.id!;
  const board = req.params.board;
  const postId = Number(req.params.postId);
  const { userId } = req.body; // 게시글 작성자 id

  const isExistingPost = await getRepository(_.upperFirst(board)).count({ id: postId });
  if (!isExistingPost) {
    logger.warn('존재하지 않는 게시글에 싫어요를 생성하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 게시글에 싫어요를 할 수 없습니다.');
  }

  let newDisLike;
  if (board === 'free') {
    newDisLike = await freeDislikeRepo.create(id, postId);
  } else if (board === 'commission') {
    newDisLike = await commissionDislikeRepo.create(id, postId);
  } else if (board === 'reque') {
    newDisLike = await requeDislikeRepo.create(id, postId);
  } else if (board === 'sale') {
    newDisLike = await saleDislikeRepo.create(id, postId);
  } else {
    logger.warn('존재하지 않는 게시판에서 게시글에 좋아요를 생성하려는 시도가 있습니다.');
    throw ApiError.NotFound('존재하지 않는 게시판입니다.');
  }

  // 게시글 작성자는 싫어요를 받음에 따라 경험치(영감력)가 깍인다.
  await getRepository(User).decrement({ id: userId }, 'exp', -2);

  logger.info('게시글 싫어요 생성 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '게시글 싫어요 생성 성공하였습니다.', newDisLike });
};
