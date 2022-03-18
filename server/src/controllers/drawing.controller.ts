import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import logger from '@src/helpers/winston.helper';
import {
  DrawingRepository,
  CommentRepository,
  LikeRepository,
  DisLikeRepository,
} from '@src/repositorys/drawing.repository';
import { Drawing } from '@src/entities/drawing/drawing.entity';
import { Like } from '@src/entities/drawing/like.entity';
import { DisLike } from '@src/entities/drawing/dislike.entity';

const drawingController = {
  create: async (req: Request, res: Response) => {
    try {
      const drawingUrl = (req.file as Express.MulterS3.File).location;
      const drawingKey = (req.file as Express.MulterS3.File).key;

      if (!drawingUrl || !drawingKey) {
        logger.info('그림 자료를 가져오지 못했습니다.');
        return res.status(200).json({ ok: false, message: '그림을 업로드 하지 않았습니다.' });
      }

      const id = req.session.user?.id;
      const { title, content } = req.body;

      if (!title) {
        logger.info('제목을 입력하지 않았습니다.');
        return res.status(200).json({ ok: false, message: '제목을 입력하지 않았습니다.' });
      }

      // drawing 테이블에 정보를 저장합니다.
      const drawing = new Drawing();
      drawing.title = title;
      drawing.content = content;
      drawing.url = drawingUrl;
      drawing.key = drawingKey;
      drawing.user_id = id!;
      await getRepository(Drawing).save(drawing);

      logger.info('그림을 저장하였습니다.');
      return res.status(200).json({ ok: true, message: '그림을 저장하였습니다.' });
    } catch (err: any) {
      logger.info('그림저장 에러', err);
      return res.status(500).json({ ok: false, message: '그림저장 에러' });
    }
  },
  getDrawings: async (req: Request, res: Response) => {
    const drawingRepo = getCustomRepository(DrawingRepository);

    try {
      const { profileId } = req.body;
      const { cursor } = req.query;

      if (cursor === 'null') {
        const drawings = await drawingRepo.findDrawingById(profileId);
        let newCursor;
        if (drawings.length < 30) {
          newCursor = 0;
        } else {
          newCursor = drawings[29].id;
        }
        logger.info('그림을 얻었습니다.');
        return res.status(200).json({ ok: true, message: '그림을 얻었습니다.', drawings, newCursor });
      } else {
        const drawings = await drawingRepo.findDrawingByIdAndCursor(profileId, Number(cursor));
        let newCursor;
        if (drawings.length < 30) {
          newCursor = 0;
        } else {
          newCursor = drawings[29].id;
        }
        logger.info('그림을 얻었습니다.');
        return res.status(200).json({ ok: true, message: '그림을 얻었습니다.', drawings, newCursor });
      }
    } catch (err: any) {
      logger.info('그림 불러오기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 불러오기 에러' });
    }
  },

  getDrawing: async (req: Request, res: Response) => {
    const drawingRepo = getCustomRepository(DrawingRepository);

    try {
      const { drawingId } = req.body;

      // 그림을 클릭한 후 그림의 세부정보를 가져오기 때문에 그림에 대한 조회수를 업데이트한다.
      await drawingRepo.addViews(drawingId);

      // 댓글, 좋아요, 싫어요 결합
      const drawing = await drawingRepo.getDrawing(drawingId);

      logger.info('그림 세부정보 불러오기 성공');
      return res.status(200).json({ ok: true, message: '그림 세부정보 불러오기 성공', drawing });
    } catch (err: any) {
      logger.info('그림 세부정보 불러오기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 세부정보 불러오기 에러' });
    }
  },

  addComment: async (req: Request, res: Response) => {
    const commentRepo = getCustomRepository(CommentRepository);

    try {
      const { userId, drawingId, comment } = req.body;

      // 댓글을 comment 테이블에 insert 한다.
      const result = await commentRepo.addComment(userId, drawingId, comment);

      // insert한후 다시 자료를 찾기보다는
      if (result.raw[0].id) {
        const insertedComment = await commentRepo.findComment(result.raw[0].id);
        logger.info('그림 댓글 추가하기 성공');
        return res.status(200).json({ ok: true, message: '그림 댓글 추가하기 성공', insertedComment });
      } else {
        logger.info('그림 댓글 추가가 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '그림 댓글 추가가 실패하였습니다.' });
      }
    } catch (err: any) {
      logger.info('그림 댓글 추가하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 댓글 추가하기 에러' });
    }
  },

  addLike: async (req: Request, res: Response) => {
    const likeRepo = getCustomRepository(LikeRepository);

    try {
      const { userId, drawingId } = req.body;

      const result = await likeRepo.addLike(userId, drawingId);

      // insert한후 다시 자료를 찾기보다는
      if (result.raw[0].id) {
        const insertedLike = {
          id: result.raw[0].id,
          user_id: userId,
          drawing_id: drawingId,
        };
        logger.info('그림 댓글 추가하기 성공');
        return res.status(200).json({ ok: true, message: '그림 댓글 추가하기 성공', insertedLike });
      } else {
        logger.info('그림 댓글 추가가 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '그림 댓글 추가가 실패하였습니다.' });
      }
    } catch (err: any) {
      logger.info('그림 댓글 추가하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 댓글 추가하기 에러' });
    }
  },
  addDisLike: async (req: Request, res: Response) => {
    const dislikeRepo = getCustomRepository(DisLikeRepository);

    try {
      const { userId, drawingId } = req.body;

      // 댓글을 comment 테이블에 insert 한다.
      const result = await dislikeRepo.addDisLike(userId, drawingId);

      // insert한후 다시 자료를 찾기보다는
      if (result.raw[0].id) {
        const insertedDisLike = { id: result.raw[0].id, user_id: userId, drawing_id: drawingId };
        logger.info('그림 댓글 추가하기 성공');
        return res.status(200).json({ ok: true, message: '그림 댓글 추가하기 성공', insertedDisLike });
      } else {
        logger.info('그림 댓글 추가가 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '그림 댓글 추가가 실패하였습니다.' });
      }
    } catch (err: any) {
      logger.info('그림 댓글 추가하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 댓글 추가하기 에러' });
    }
  },
  removeLike: async (req: Request, res: Response) => {
    const likeRepo = getCustomRepository(LikeRepository);

    try {
      const { userId } = req.body;

      // 댓글을 comment 테이블에 insert 한다.
      await likeRepo.removeLike(userId);

      // insert한후 다시 자료를 찾기보다는
      const deletedUser = userId;

      logger.info('그림 댓글 제거하기 성공');
      return res.status(200).json({ ok: true, message: '그림 댓글 제거하기 성공', deletedUser });
    } catch (err: any) {
      logger.info('그림 댓글 제거하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 댓글 제거하기 에러' });
    }
  },
  removeDisLike: async (req: Request, res: Response) => {
    const dislikeRepo = getCustomRepository(DisLikeRepository);

    try {
      const { userId } = req.body;

      // 댓글을 comment 테이블에 insert 한다.
      await dislikeRepo.removeDisLike(userId);
      // insert한후 다시 자료를 찾기보다는

      const deletedUser = userId;
      logger.info('그림 댓글 제거하기 성공');
      return res.status(200).json({ ok: true, message: '그림 댓글 제거하기 성공', deletedUser });
    } catch (err: any) {
      logger.info('그림 댓글 제거하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 댓글 제거하기 에러' });
    }
  },
  edit: async (req: Request, res: Response) => {},
  delete: async (req: Request, res: Response) => {},
};

export default drawingController;
