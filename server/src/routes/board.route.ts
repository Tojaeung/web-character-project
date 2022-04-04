import { Router, Request } from 'express';
import boardController from '@src/controllers/board.controller';
import auth from '@src/middlewares/auth.middleware';
import { boardUpload } from '@src/helpers/s3.helper';

const boardRouter = Router();

boardRouter.get('/board/getBoards', boardController.getBoards);
boardRouter.post('/board/getBoard', boardController.getBoard);

boardRouter.post('/board/getPost', boardController.getPost);
boardRouter.post('/board/imageUpload', auth, boardUpload.single('image'), boardController.imageUpload);
boardRouter.post('/board/imageRemove', auth, boardController.imageRemove);

boardRouter.post('/board/addPost', auth, boardController.addPost);
boardRouter.post('/board/addPostComment', auth, boardController.addPostComment);

export default boardRouter;
