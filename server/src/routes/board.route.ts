import { Router } from 'express';
import boardController from '@src/controllers/board.controller';

const boardRouter = Router();

boardRouter.get('/board/getBoards', boardController.getBoards);
boardRouter.post('/board/getBoard', boardController.getBoard);

export default boardRouter;
