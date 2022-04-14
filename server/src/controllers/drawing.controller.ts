import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import logger from '@src/helpers/winston.helper';
import {
  DrawingRepository,
  DrawingCommentRepository,
  LikeRepository,
  DisLikeRepository,
} from '@src/repositorys/drawing.repository';
import { Drawing } from '@src/entities/drawing/drawing.entity';
import { DrawingComment } from '@src/entities/drawing/drawingComment.entity';
import { Like } from '@src/entities/drawing/like.entity';
import { DisLike } from '@src/entities/drawing/dislike.entity';

const drawingController = {
  addDrawing: async (req: Request, res: Response) => {
    const drawingRepo = getCustomRepository(DrawingRepository);
    try {
      const drawingUrl = (req.file as Express.MulterS3.File).location;
      const drawingKey = (req.file as Express.MulterS3.File).key;

      if (!drawingUrl || !drawingKey) {
        logger.info('그림 자료를 가져오지 못했습니다.');
        return res.status(400).json({ ok: false, message: '그림을 업로드 하지 않았습니다.' });
      }

      const id = req.session.user?.id;
      const { content } = req.body;

      if (content.length === 0 || content === '<p><br></p>') {
        logger.info('그림 내용을 입력하지 않아서 데이터에 추가 할 수 없습니다.');
        return res.status(400).json({ ok: false, message: '내용을 입력해주세요.' });
      } else if (content.length > 10000) {
        logger.info('그림 내용을 너무 많이 입력해서 데이터에 추가 할 수 없습니다.');
        return res.status(400).json({ ok: false, message: '내용 글자 수를 초과하였습니다.' });
      }

      // drawing 테이블에 정보를 저장합니다.
      const drawing = new Drawing();
      drawing.content = content;
      drawing.url = drawingUrl;
      drawing.key = drawingKey;
      drawing.user_id = id!;

      await getRepository(Drawing).save(drawing);

      // 위에 drawing은 user정보가 없다.
      // drawing으로 응답을 보내면 새로 추가된 그림은 user 정보가 빠진 view를 보여주게 된다.
      // 그래서. drawing과 user를 결합시킨 newDrawing으로 응답을 보내준다.
      const newDrawing = await drawingRepo.drawingJoinUser(Number(id));

      logger.info('그림을 저장하였습니다.');
      return res.status(200).json({ ok: true, message: '그림을 저장하였습니다.', newDrawing });
    } catch (err: any) {
      logger.info('그림저장 에러', err);
      return res.status(500).json({ ok: false, message: '그림저장 에러' });
    }
  },

  removeDrawing: async (req: Request, res: Response) => {
    const drawingRepo = getCustomRepository(DrawingRepository);
    try {
      const { drawingId } = req.params;

      const result = await drawingRepo.removeDrawing(Number(drawingId));

      if (result.affected === 0) {
        logger.info('그림 제거 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '그림 제거 실패하였습니다.' });
      }

      logger.info('그림 제거 성공하였습니다.');
      return res
        .status(200)
        .json({ ok: true, message: '그림 제거 성공하였습니다.', removedDrawingId: Number(drawingId) });
    } catch (err: any) {
      logger.info('그림제거 에러', err);
      return res.status(500).json({ ok: false, message: '그림제거 에러' });
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

      await drawingRepo.addDrawingView(drawingId);

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
    const drawingLikeRepo = getCustomRepository(LikeRepository);
    try {
      const { userId } = req.params;

      const removedLike = await drawingLikeRepo.removeDrawingLike(Number(userId));

      if (removedLike.affected === 0) {
        logger.info('그림 좋아요 제거 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '그림 좋아요 제거 실패하였습니다.' });
      }

      logger.info('그림 좋아요 제거하기 성공');
      return res.status(200).json({ ok: true, message: '그림 좋아요 제거하기 성공', removedLikeId: userId });
    } catch (err: any) {
      logger.info('그림 좋아요 제거하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 좋아요 제거하기 에러' });
    }
  },
  removeDisLike: async (req: Request, res: Response) => {
    const drawingDisLikeRepo = getCustomRepository(DisLikeRepository);
    try {
      const { userId } = req.params;

      const removedDisLike = await drawingDisLikeRepo.removeDrawingDisLike(Number(userId));

      if (removedDisLike.affected === 0) {
        logger.info('그림 싫어요 제거 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '그림 싫어요 제거 실패하였습니다.' });
      }

      logger.info('그림 싫어요 제거하기 성공');
      return res.status(200).json({ ok: true, message: '그림 싫어요 제거하기 성공', removedDisLikeId: userId });
    } catch (err: any) {
      logger.info('그림 싫어요 제거하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 싫어요 제거하기 에러' });
    }
  },

  removeComment: async (req: Request, res: Response) => {
    const drawingCommentRepo = getCustomRepository(DrawingCommentRepository);
    try {
      const { drawingCommentId } = req.params;

      const removedDrawingComment = drawingCommentRepo.removeDrawingComment(Number(drawingCommentId));

      if ((await removedDrawingComment).affected === 0) {
        logger.info('그림 댓글 삭제 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '그림 댓글 삭제 실패하였습니다.' });
      }

      logger.info('그림 댓글 삭제하기 성공');
      return res
        .status(200)
        .json({ ok: true, message: '그림 댓글 삭제하기 성공', removedCommentId: Number(drawingCommentId) });
    } catch (err: any) {
      logger.info('그림 댓글 삭제하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 댓글 삭제하기 에러' });
    }
  },
  editComment: async (req: Request, res: Response) => {
    const drawingCommentRepo = getCustomRepository(DrawingCommentRepository);
    try {
      const { drawingCommentId, editedContent } = req.body;

      const editedDrawingComment = await drawingCommentRepo.editDrawingComment(drawingCommentId, editedContent);

      if (editedDrawingComment.affected === 0) {
        logger.info('해당하는 그림 댓글이 존재하지 않습니다.');
        return res.status(400).json({ ok: false, message: '그림 댓글 수정하기 실패' });
      }

      logger.info('그림 댓글 수정하기 완료');
      return res.status(200).json({
        ok: true,
        message: '그림 댓글 수정하기 완료',
        drawingCommentId: Number(drawingCommentId),
        editedContent,
      });
    } catch (err: any) {
      logger.info('그림 댓글 수정하기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 댓글 수정하기 에러' });
    }
  },
};

export default drawingController;
