import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import logger from '@src/helpers/winston.helper';
import { DrawingRepository, DrawingCommentRepository } from '@src/repositorys/drawing.repository';
import { Drawing } from '@src/entities/drawing/drawing.entity';
import { DrawingComment } from '@src/entities/drawing/drawingComment.entity';
import { Like } from '@src/entities/drawing/like.entity';
import { DisLike } from '@src/entities/drawing/dislike.entity';

const drawingController = {
  addDrawing: async (req: Request, res: Response) => {
    try {
      const drawingUrl = (req.file as Express.MulterS3.File).location;
      const drawingKey = (req.file as Express.MulterS3.File).key;

      if (!drawingUrl || !drawingKey) {
        logger.info('그림 자료를 가져오지 못했습니다.');
        return res.status(400).json({ ok: false, message: '그림을 업로드 하지 않았습니다.' });
      }

      const id = req.session.user?.id;
      const { title, content } = req.body;

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
      const { profileId, cursor } = req.body;

      // 무한스크롤 작동할때마다 몇개의 그림이 뜨는지 정하는 변수
      const drawingsLimit = 10;

      let drawings;
      let newCursor;
      // 처음 drawings를 받아올때 cursor는 0이다.
      if (cursor === 0) {
        drawings = await drawingRepo.getDrawingsById(profileId, drawingsLimit);
        if (drawings.length < drawingsLimit) {
          newCursor = null;
        } else {
          newCursor = drawings[drawingsLimit - 1].id;
        }
      } else {
        drawings = await drawingRepo.getDrawingsByCursor(profileId, Number(cursor), drawingsLimit);
        if (drawings.length < drawingsLimit) {
          newCursor = null;
        } else {
          newCursor = drawings[drawingsLimit - 1].id;
        }
      }

      logger.info('그림을 얻었습니다.');
      return res.status(200).json({ ok: true, message: '그림을 얻었습니다.', drawings, newCursor });
    } catch (err: any) {
      logger.info('그림 불러오기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 불러오기 에러' });
    }
  },
  addView: async (req: Request, res: Response) => {
    const drawingRepo = getCustomRepository(DrawingRepository);
    try {
      const { drawingId } = req.body;

      await drawingRepo.addView(drawingId);

      logger.info('그림 조회수 추가하기 성공');
      return res.status(200).json({ ok: true, message: '그림 조회수 추가하기 성공' });
    } catch (err: any) {
      logger.info('그림 조회수 추가하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 조회수 추가하기 에러' });
    }
  },

  addComment: async (req: Request, res: Response) => {
    const drawingCommentRepo = getCustomRepository(DrawingCommentRepository);
    try {
      const { userId, drawingId, content } = req.body;

      const drawingComment = new DrawingComment();
      drawingComment.user_id = userId;
      drawingComment.drawing_id = drawingId;
      drawingComment.content = content;
      await getRepository(DrawingComment).save(drawingComment);

      const addedComment = await drawingCommentRepo.drawingCommentJoinUser(drawingComment.id);

      logger.info('그림 댓글 추가하기 성공');
      return res.status(200).json({ ok: true, message: '그림 댓글 추가하기 성공', addedComment });
    } catch (err: any) {
      logger.info('그림 댓글 추가하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 댓글 추가하기 에러' });
    }
  },

  addLike: async (req: Request, res: Response) => {
    try {
      const { userId, drawingId } = req.body;

      const addedLike = new Like();
      addedLike.user_id = userId;
      addedLike.drawing_id = drawingId;
      await getRepository(Like).save(addedLike);

      logger.info('그림 좋아요 추가하기 성공');
      return res.status(200).json({ ok: true, message: '그림 좋아요 추가하기 성공', addedLike });
    } catch (err: any) {
      logger.info('그림 좋아요 추가하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 좋아요 추가하기 에러' });
    }
  },
  addDisLike: async (req: Request, res: Response) => {
    try {
      const { userId, drawingId } = req.body;

      const addedDislike = new DisLike();
      addedDislike.user_id = userId;
      addedDislike.drawing_id = drawingId;
      await getRepository(DisLike).save(addedDislike);

      logger.info('그림 싫어요 추가하기 성공');
      return res.status(200).json({ ok: true, message: '그림 싫어요 추가하기 성공', addedDislike });
    } catch (err: any) {
      logger.info('그림 싫어요 추가하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 싫어요 추가하기 에러' });
    }
  },
  removeLike: async (req: Request, res: Response) => {
    try {
      const { userId, drawingId } = req.body;

      const removedLike = await getRepository(Like).findOne({
        where: { user_id: userId, drawing_id: drawingId },
      });

      if (!removedLike) {
        logger.info('해당하는 그림 좋아요가 존재하지 않습니다.');
        return res.status(400).json({ ok: false, message: '그림 좋아요 제거하기 실패' });
      }

      // removedLike 제거시 PK도 객체에서 제거되기 때문에 따라 PK정보를 뺴내준다.
      const removedLikeId = removedLike.id;
      await getRepository(Like).remove(removedLike);

      logger.info('그림 좋아요 제거하기 성공');
      return res.status(200).json({ ok: true, message: '그림 좋아요 제거하기 성공', removedLikeId });
    } catch (err: any) {
      logger.info('그림 좋아요 제거하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 좋아요 제거하기 에러' });
    }
  },
  removeDisLike: async (req: Request, res: Response) => {
    try {
      const { userId, drawingId } = req.body;

      const removedDisLike = await getRepository(DisLike).findOne({
        where: { user_id: userId, drawing_id: drawingId },
      });

      if (!removedDisLike) {
        logger.info('해당하는 그림 싫어요가 존재하지 않습니다.');
        return res.status(400).json({ ok: false, message: '그림 싫어요 제거하기 실패' });
      }

      const removedDisLikeId = removedDisLike?.id;
      await getRepository(DisLike).remove(removedDisLike);

      logger.info('그림 싫어요 제거하기 성공');
      return res.status(200).json({ ok: true, message: '그림 싫어요 제거하기 성공', removedDisLikeId });
    } catch (err: any) {
      logger.info('그림 싫어요 제거하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 싫어요 제거하기 에러' });
    }
  },

  removeComment: async (req: Request, res: Response) => {
    try {
      const { drawingCommentId } = req.body;

      const removedComment = await getRepository(DrawingComment).findOne({ id: drawingCommentId });

      if (!removedComment) {
        logger.info('해당하는 그림 댓글이 존재하지 않습니다.');
        return res.status(400).json({ ok: false, message: '그림 댓글 삭제하기 실패' });
      }

      const removedCommentId = removedComment.id;
      await getRepository(DrawingComment).remove(removedComment);

      logger.info('그림 댓글 삭제하기 성공');
      return res.status(200).json({ ok: true, message: '그림 댓글 삭제하기 성공', removedCommentId });
    } catch (err: any) {
      logger.info('그림 댓글 삭제하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 댓글 삭제하기 에러' });
    }
  },
  editComment: async (req: Request, res: Response) => {
    try {
      const { drawingCommentId, editedContent } = req.body;

      const editedComment = await getRepository(DrawingComment).findOne({ id: drawingCommentId });
      if (!editedComment) {
        logger.info('해당하는 그림 댓글이 존재하지 않습니다.');
        return res.status(400).json({ ok: false, message: '그림 댓글 수정하기 실패' });
      }
      editedComment.content = editedContent;
      await getRepository(DrawingComment).save(editedComment);

      logger.info('그림 댓글 수정하기 완료');
      return res.status(200).json({ ok: true, message: '그림 댓글 수정하기 완료', editedComment });
    } catch (err: any) {
      logger.info('그림 댓글 수정하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 댓글 수정하기 에러' });
    }
  },
};

export default drawingController;
