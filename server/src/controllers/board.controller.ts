import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { PostCommentRepository, PostRepository } from '@src/repositorys/board.repository';
import logger from '@src/helpers/winston.helper';

const boardController = {
  getBoards: async (req: Request, res: Response) => {
    const postRepo = getCustomRepository(PostRepository);
    try {
      const free = await postRepo.getFree();
      const drawingCommission = await postRepo.getDrawingCommission();
      const drawingRequest = await postRepo.getDrawingRequest();
      const drawingSale = await postRepo.getDrawingSale();

      logger.info('게시판 모두 가져오기 성공하였습니다.');
      return res.status(200).json({
        ok: true,
        message: '게시판 모두 가져오기 성공하였습니다.',
        free,
        drawingCommission,
        drawingRequest,
        drawingSale,
      });
    } catch (err: any) {
      logger.info('게시판 모두 가져오기 실패하였습니다.', err);
      return res.status(500).json({ ok: false, message: '게시판 모두 가져오기 에러' });
    }
  },
  getBoard: async (req: Request, res: Response) => {
    const postRepo = getCustomRepository(PostRepository);
    try {
      const { board, page, limit } = req.body;

      const offset = (Number(page) - 1) * Number(limit);
      const selectedBoard = await postRepo.getSelectedBoard(board, offset, Number(limit));
      const result = await postRepo.CountPosts(board as string);

      logger.info('게시판 가져오기 성공하였습니다.');
      return res
        .status(200)
        .json({ ok: true, message: '게시판 가져오기 성공하였습니다.', selectedBoard, totalPostsNum: result.count });
    } catch (err: any) {
      logger.info('게시판 가져오기 실패하였습니다.', err);
      return res.status(500).json({ ok: false, message: '게시판 가져오기 에러' });
    }
  },
};

export default boardController;
