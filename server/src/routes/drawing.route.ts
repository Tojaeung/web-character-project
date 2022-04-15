import { Router } from 'express';
import drawingController from '@src/controllers/drawing.controller';
import auth from '@src/middlewares/auth.middleware';
import { drawingUpload } from '@src/helpers/s3.helper';

const drawingRouter = Router();

drawingRouter.post('/drawing/addDrawing', auth, drawingUpload.single('drawing'), drawingController.addDrawing);
drawingRouter.delete('/drawing/removeDrawing/:drawingId', auth, drawingController.removeDrawing);

drawingRouter.post('/drawing/getDrawings', drawingController.getDrawings);
drawingRouter.post('/drawing/addView', drawingController.addView);
drawingRouter.post('/drawing/addComment', auth, drawingController.addComment);
drawingRouter.post('/drawing/addLike', auth, drawingController.addLike);
drawingRouter.post('/drawing/addDisLike', auth, drawingController.addDisLike);
drawingRouter.delete('/drawing/removeComment/:drawingCommentId', auth, drawingController.removeComment);
drawingRouter.patch('/drawing/editComment', auth, drawingController.editComment);

export default drawingRouter;
