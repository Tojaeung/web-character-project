import { Router } from 'express';
import drawingController from '@src/controllers/drawing.controller';
import auth from '@src/middlewares/auth.middleware';
import penalty from '@src/middlewares/penalty.middleware';
import { drawingUpload } from '@src/helpers/s3.helper';

const drawingRouter = Router();

drawingRouter.post('/drawing/addDrawing', auth, penalty, drawingUpload.single('drawing'), drawingController.addDrawing);
drawingRouter.delete('/drawing/removeDrawing/:drawingId', auth, drawingController.removeDrawing);

drawingRouter.post('/drawing/getDrawings', drawingController.getDrawings);
drawingRouter.post('/drawing/addView', drawingController.addView);
drawingRouter.post('/drawing/addComment', auth, penalty, drawingController.addComment);
drawingRouter.post('/drawing/addLike', auth, penalty, drawingController.addLike);
drawingRouter.post('/drawing/addDisLike', auth, penalty, drawingController.addDisLike);
drawingRouter.delete('/drawing/removeComment/:drawingCommentId', auth, drawingController.removeComment);
drawingRouter.patch('/drawing/editComment', auth, penalty, drawingController.editComment);

export default drawingRouter;
