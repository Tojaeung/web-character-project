import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import logger from '@src/helpers/winston.helper';
import { DrawingRepository, DrawingCommentRepository } from '@src/repositorys/drawing.repository';
import User from '@src/entities/user/user.entity';
import Drawing from '@src/entities/drawing/drawing.entity';
import DrawingComment from '@src/entities/drawing/comment.entity';
import Like from '@src/entities/drawing/like.entity';
import DisLike from '@src/entities/drawing/dislike.entity';

import {
  createCommentInput,
  createDisLikeInput,
  createDrawingInput,
  createLikeInput,
  deleteCommentInput,
  deleteDrawingInput,
  getDrawingsInput,
  incrementViewInput,
  updateCommentInput,
} from '@src/schemas/drawing.schema';
import ApiError from '@src/errors/api.error';

export const createDrawing = async (req: Request<{}, {}, createDrawingInput['body']>, res: Response): Promise<any> => {
  const drawingRepo = getCustomRepository(DrawingRepository);

  const id = req.session.user?.id!;
  const { content } = req.body;
  const drawingUrl = (req.file as Express.MulterS3.File).location;
  const drawingKey = (req.file as Express.MulterS3.File).key;

  if (!drawingUrl || !drawingKey) {
    logger.error('s3에서 새로운 그림정보를 받아오지 못했습니다.');
    throw ApiError.InternalServerError('내부적인 문제로 그림을 업로드 실패하였습니다.');
  }

  // 새로운 그림 정보를 생성한다.
  const result = await getRepository(Drawing).insert({
    content,
    url: drawingUrl,
    key: drawingKey,
    user_id: Number(id),
  });
  const newDrawing = result.raw[0];

  // 위에 newDrawing은 user정보가 없다.
  // drawing으로 응답을 보내면 새로 추가된 그림은 user 정보가 빠진 view를 보여주게 된다.
  // 그래서. drawing과 user를 결합시킨 newDrawing으로 응답을 보내준다.
  const newDrawingJoinUser = await drawingRepo.joinUser(newDrawing.id);

  logger.info(`${id}님 그림을 저장하였습니다.`);
  return res.status(200).json({ ok: true, message: '그림을 저장하였습니다.', newDrawingJoinUser });
};

export const getDrawings = async (req: Request<{}, getDrawingsInput['query']>, res: Response) => {
  const drawingRepo = getCustomRepository(DrawingRepository);

  const id = req.session.user?.id!;
  const { cursor } = req.query;

  // 무한스크롤 작동할때마다 몇개의 그림이 뜨는지 정하는 변수
  const limit = 20;
  // 무한스크롤 작동시마다 클라이언트에 응답해줄 그림들
  let drawings;
  // 무한스크롤 작동시 아직도 남아있는 그림이 없다면 null을 응답해줘서 무한스크롤을 중지시킨다.
  let newCursor;

  // 처음 drawings를 받아올때 cursor는 0이다.
  if (Number(cursor) === 0) {
    drawings = await drawingRepo.getDrawingsById(Number(id), limit);
  } else {
    drawings = await drawingRepo.getDrawingsByCursor(Number(id), Number(cursor), limit);
  }

  // 무한스크롤로 인해 요청받은 그림들이 limit보다 적다면(더이상 응답할 데이터가 없다는 뜻)
  // 커서 값으로 null을 리턴해주어서 무한스크롤을 작동시키지 않는다.
  if (drawings.length <= limit) {
    newCursor = null;
  } else {
    newCursor = drawings[limit - 1].id;
  }

  logger.info(`${drawings.length}장의 그림을 얻었습니다.`);
  return res.status(200).json({ ok: true, message: '그림을 얻었습니다.', drawings, newCursor });
};

export const deleteDrawing = async (req: Request<deleteDrawingInput['params']>, res: Response): Promise<any> => {
  const { drawingId } = req.params;

  const isExistingDrawing = await getRepository(Drawing).count({ id: Number(drawingId) });
  if (!isExistingDrawing) {
    logger.warn('존재하지 않는 그림을 삭제 시도하려고 합니다.');
    throw ApiError.NotFound('존재하지 않는 그림입니다.');
  }

  const result = await getRepository(Drawing).delete({ id: Number(drawingId) });
  const deletedDrawing = result.raw[0];

  logger.info(`그림 제거 성공하였습니다.`);
  return res.status(200).json({ ok: true, message: '그림 제거 성공하였습니다.', deletedDrawing });
};

export const incrementView = async (req: Request<incrementViewInput['params']>, res: Response) => {
  const { drawingId } = req.params;

  await getRepository(Drawing).increment({ id: Number(drawingId) }, 'views', 1);

  logger.info('그림 조회수 추가하기 성공');
  return res.status(200).json({ ok: true, message: '그림 조회수 추가하기 성공' });
};

export const createComment = async (
  req: Request<createCommentInput['params'], {}, createCommentInput['body']>,
  res: Response
) => {
  const commentRepo = getCustomRepository(DrawingCommentRepository);

  const id = req.session.user?.id!;
  const { drawingId } = req.params;
  const { content } = req.body;

  const result = await getRepository(DrawingComment).insert({
    user_id: Number(id),
    drawing_id: Number(drawingId),
    content: content,
  });
  const newComment = result.raw[0];

  // 위에 newComment은 user정보가 없다.
  // 응답을 보내면 새로 추가된 댓글은 user 정보가 빠진 view를 보여주게 된다.
  // 그래서. comment와 user를 결합시킨 newDrawing으로 응답을 보내준다.
  const newCommentJoinUser = await commentRepo.joinUser(Number(newComment.id));

  logger.info('그림 댓글 추가하기 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '그림 댓글 추가하기 성공하였습니다.', newCommentJoinUser });
};

export const updateComment = async (req: Request<updateCommentInput['params']>, res: Response): Promise<any> => {
  const { commentId } = req.params;
  const { content } = req.body;

  const isExistingComment = await getRepository(DrawingComment).count({ id: Number(commentId) });
  if (!isExistingComment) {
    logger.warn('존재하지 않는 댓글을 삭제하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 댓글입니다.');
  }

  const result = await getRepository(DrawingComment).update(Number(commentId), { content });
  const updatedComment = result.raw[0];

  logger.info('그림 댓글 삭제 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '그림 댓글 삭제 성공하였습니다.', updatedComment });
};

export const deleteComment = async (req: Request<deleteCommentInput['params']>, res: Response): Promise<any> => {
  const { commentId } = req.params;

  const isExistingComment = await getRepository(DrawingComment).count({ id: Number(commentId) });
  if (!isExistingComment) {
    logger.warn('존재하지 않는 댓글을 삭제하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 댓글입니다.');
  }

  const result = await getRepository(DrawingComment).delete({ id: Number(commentId) });
  const deletedComment = result.raw[0];

  logger.info('그림 댓글 삭제 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '그림 댓글 삭제 성공하였습니다.', deletedComment });
};

export const createLike = async (req: Request<createLikeInput['params']>, res: Response): Promise<any> => {
  const id = req.session.user?.id!;
  const { drawingId } = req.params;

  const isExistingUser = await getRepository(User).count({ id });
  if (!isExistingUser) {
    logger.warn('존재하지 않는 유저가 그림 좋아요를 추가하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }
  const drawing = await getRepository(Drawing).findOne({ id: Number(drawingId) });
  if (!drawing) {
    logger.warn('존재하지 않는 그림에 좋아요를 추가하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 그림입니다.');
  }

  const result = await getRepository(Like).insert({ valuerId: id, drawing_id: Number(drawingId) });
  const newLike = result.raw[0];

  // 그림 올린 사람은 좋아요를 받음에 따라 경험치(영감력)를 얻는다.
  await getRepository(User).increment({ id: drawing.user_id }, 'exp', 5);

  logger.info('그림 좋아요 추가하기 성공');
  return res.status(200).json({ ok: true, message: '그림 좋아요 추가하기 성공', newLike });
};

export const createDisLike = async (req: Request<createDisLikeInput['params']>, res: Response): Promise<any> => {
  const id = req.session.user?.id!;
  const { drawingId } = req.params;

  const isExistingUser = await getRepository(User).count({ id });
  if (!isExistingUser) {
    logger.warn('존재하지 않는 유저가 그림 싫어요를 추가하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }
  const drawing = await getRepository(Drawing).findOne({ id: Number(drawingId) });
  if (!drawing) {
    logger.warn('존재하지 않는 그림에 싫어요를 추가하려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 그림입니다.');
  }

  // 그림 올린 사람은 싫어요를 받음에 따라 경험치(영감력)가 깍인다.
  await getRepository(User).decrement({ id: drawing.user_id }, 'exp', -2);

  const result = await getRepository(DisLike).insert({ valuerId: id, drawing_id: Number(drawingId) });
  const newDisLike = result.raw[0];

  logger.info('그림 싫어요 추가하기 성공');
  return res.status(200).json({ ok: true, message: '그림 싫어요 추가하기 성공', newDisLike });
};
