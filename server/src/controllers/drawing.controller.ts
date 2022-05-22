import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import logger from '@src/helpers/winston.helper';
import {
  DrawingRepository,
  DrawingCommentRepository,
  LikeRepository,
  DisLikeRepository,
} from '@src/repositorys/drawing.repository';
import User from '@src/entities/profile/user.entity';
import Drawing from '@src/entities/drawing/drawing.entity';
import DrawingComment from '@src/entities/drawing/comment.entity';
import ApiError from '@src/errors/api.error';
import s3Delete from '@src/utils/s3.utils';
import {
  CreateCommentDTO,
  CreateDisLikeDTO,
  CreateDrawingDTO,
  CreateLikeDTO,
  UpdateCommentDTO,
} from '@src/schemas/drawing.schema';

export const createDrawing = async (req: Request<{}, {}, CreateDrawingDTO>, res: Response): Promise<any> => {
  const drawingRepo = getCustomRepository(DrawingRepository);

  const id = req.session.user?.id!;
  const { content } = req.body;
  const drawingUrl = (req.file as Express.MulterS3.File).location;
  const drawingKey = (req.file as Express.MulterS3.File).key;

  if (!drawingUrl || !drawingKey) {
    logger.error('그림 생성시, s3 이미지 정보를 가져오지 못했습니다.');
    throw ApiError.InternalServerError('내부적인 문제로 그림 업로드를 실패하였습니다.');
  }

  // 새로운 그림 정보를 생성한다.
  const newDrawing = await drawingRepo.create(content, drawingUrl, drawingKey, id);

  // 위에 newDrawing은 user정보가 없다.
  // drawing으로 응답을 보내면 새로 추가된 그림은 user 정보가 빠진 view를 보여주게 된다.
  // 그래서. drawing과 user를 결합시킨 newDrawing으로 응답을 보내준다.
  const newDrawingJoinUser = await drawingRepo.joinUser(newDrawing.id);

  logger.info(`${id}님 그림을 저장하였습니다.`);
  return res.status(200).json({ ok: true, message: '그림을 저장하였습니다.', newDrawingJoinUser });
};

export const getDrawings = async (req: Request, res: Response): Promise<any> => {
  const drawingRepo = getCustomRepository(DrawingRepository);

  const userId = Number(req.params.userId);
  const cursor = Number(req.query.cursor as string);

  // 무한스크롤 작동할때마다 몇개의 그림이 뜨는지 정하는 변수
  const limit = 20;
  // 무한스크롤 작동시마다 클라이언트에 응답해줄 그림들
  let drawings;
  // 무한스크롤 작동시 아직도 남아있는 그림이 없다면 null을 응답해줘서 무한스크롤을 중지시킨다.
  let newCursor;

  // 처음 drawings를 받아올때 cursor는 0이다.
  if (cursor === 0) {
    drawings = await drawingRepo.getDrawingsById(userId, limit);
  } else {
    drawings = await drawingRepo.getDrawingsByCursor(userId, cursor, limit);
  }

  // 무한스크롤로 인해 요청받은 그림들이 limit보다 적다면(더이상 응답할 데이터가 없다는 뜻)
  // 커서 값으로 null을 리턴해주어서 무한스크롤을 작동시키지 않는다.
  if (drawings.length < limit) {
    newCursor = null;
  } else {
    newCursor = drawings[limit - 1].id;
  }

  logger.info(`${drawings.length}장의 그림을 얻었습니다.`);
  return res.status(200).json({ ok: true, message: '그림을 얻었습니다.', drawings, newCursor });
};

export const deleteDrawing = async (req: Request, res: Response): Promise<any> => {
  const drawingRepo = getCustomRepository(DrawingRepository);

  const drawingId = Number(req.params.drawingId);

  const isExistingDrawing = await getRepository(Drawing).count({ id: drawingId });
  if (!isExistingDrawing) {
    logger.warn('존재하지 않는 그림을 삭제 시도하려고 합니다.');
    throw ApiError.BadRequest('존재하지 않는 그림입니다.');
  }

  const deletedDrawing = await drawingRepo.delete(drawingId);
  await s3Delete(deletedDrawing.key);

  logger.info(`그림 제거 성공하였습니다.`);
  return res.status(200).json({ ok: true, message: '그림 제거 성공하였습니다.', deletedDrawing });
};

export const incrementView = async (req: Request, res: Response): Promise<any> => {
  const drawingId = Number(req.params.drawingId);

  await getRepository(Drawing).increment({ id: drawingId }, 'views', 1);

  logger.info('그림 조회수 추가하기 성공');
  return res.status(200).json({ ok: true, message: '그림 조회수 추가하기 성공' });
};

export const createComment = async (
  req: Request<CreateCommentDTO['params'], {}, CreateCommentDTO['body']>,
  res: Response
): Promise<any> => {
  const commentRepo = getCustomRepository(DrawingCommentRepository);

  const id = req.session.user?.id!;
  const drawingId = Number(req.params.drawingId);
  const { content } = req.body;

  const newComment = await commentRepo.create(id, drawingId, content);

  // 위에 newComment은 user정보가 없다.
  // 응답을 보내면 새로 추가된 댓글은 user 정보가 빠진 view를 보여주게 된다.
  // 그래서. comment와 user를 결합시킨 newDrawing으로 응답을 보내준다.
  const newCommentJoinUser = await commentRepo.joinUser(newComment.id);

  logger.info('그림 댓글 추가하기 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '그림 댓글 추가하기 성공하였습니다.', newCommentJoinUser });
};

export const updateComment = async (
  req: Request<UpdateCommentDTO['params'], {}, UpdateCommentDTO['body']>,
  res: Response
): Promise<any> => {
  const commentRepo = getCustomRepository(DrawingCommentRepository);

  const commentId = Number(req.params.commentId);
  const { updatedContent } = req.body;

  const isExistingComment = await getRepository(DrawingComment).count({ id: commentId });
  if (!isExistingComment) {
    logger.warn('존재하지 않는 댓글을 삭제하려고 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 댓글입니다.');
  }

  const updatedComment = await commentRepo.update(commentId, updatedContent);

  // 위에 newComment은 user정보가 없다.
  // 응답을 보내면 새로 추가된 댓글은 user 정보가 빠진 view를 보여주게 된다.
  // 그래서. comment와 user를 결합시킨 newDrawing으로 응답을 보내준다.
  const udpatedCommentJoinUser = await commentRepo.joinUser(updatedComment.id);

  logger.info('그림 댓글 수정 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '그림 댓글 수정 성공하였습니다.', udpatedCommentJoinUser });
};

export const deleteComment = async (req: Request, res: Response): Promise<any> => {
  const commentRepo = getCustomRepository(DrawingCommentRepository);

  const commentId = Number(req.params.commentId);

  const isExistingComment = await getRepository(DrawingComment).count({ id: commentId });
  if (!isExistingComment) {
    logger.warn('존재하지 않는 댓글을 삭제하려고 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 댓글입니다.');
  }

  // 제거하기 때문에 유저정보와 결합해서 클라이언트에 보내주지 않는다.
  const deletedComment = await commentRepo.delete(commentId);

  logger.info('그림 댓글 삭제 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '그림 댓글 삭제 성공하였습니다.', deletedComment });
};

export const createLike = async (
  req: Request<CreateLikeDTO['params'], {}, CreateLikeDTO['body']>,
  res: Response
): Promise<any> => {
  const likeRepo = getCustomRepository(LikeRepository);

  const id = req.session.user?.id!;
  const drawingId = Number(req.params.drawingId);
  const { userId } = req.body; // 그림 게시자 id

  const isExistingUser = await getRepository(User).count({ id });
  if (!isExistingUser) {
    logger.warn('존재하지 않는 유저가 그림 좋아요를 추가하려고 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }
  const drawing = await getRepository(Drawing).count({ id: drawingId });
  if (!drawing) {
    logger.warn('존재하지 않는 그림에 좋아요를 추가하려고 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 그림입니다.');
  }

  const newLike = await likeRepo.create(id, drawingId);

  // 그림 올린 사람은 좋아요를 받음에 따라 경험치(영감력)를 얻는다.
  await getRepository(User).increment({ id: userId }, 'exp', 5);

  logger.info('그림 좋아요 추가하기 성공');
  return res.status(200).json({ ok: true, message: '그림 좋아요 추가하기 성공', newLike });
};

export const createDisLike = async (
  req: Request<CreateDisLikeDTO['params'], {}, CreateDisLikeDTO['body']>,
  res: Response
): Promise<any> => {
  const disLikeRepo = getCustomRepository(DisLikeRepository);

  const id = req.session.user?.id!;
  const drawingId = Number(req.params.drawingId);
  const { userId } = req.body; // 그림 게시자 id

  const isExistingUser = await getRepository(User).count({ id });
  if (!isExistingUser) {
    logger.warn('존재하지 않는 유저가 그림 싫어요를 추가하려고 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }
  const drawing = await getRepository(Drawing).count({ id: drawingId });
  if (!drawing) {
    logger.warn('존재하지 않는 그림에 싫어요를 추가하려고 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 그림입니다.');
  }

  const newDisLike = await disLikeRepo.create(id, drawingId);

  // 그림 올린 사람은 싫어요를 받음에 따라 경험치(영감력)가 깍인다.
  await getRepository(User).decrement({ id: userId }, 'exp', -2);

  logger.info('그림 싫어요 추가하기 성공');
  return res.status(200).json({ ok: true, message: '그림 싫어요 추가하기 성공', newDisLike });
};
