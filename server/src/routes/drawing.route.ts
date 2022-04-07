import { Router } from 'express';
import drawingController from '@src/controllers/drawing.controller';
import auth from '@src/middlewares/auth.middleware';
import { drawingUpload } from '@src/helpers/s3.helper';

const drawingRouter = Router();

drawingRouter.post('/drawing/create', auth, drawingUpload.single('drawing'), drawingController.addDrawing);
drawingRouter.post('/drawing/getDrawings', drawingController.getDrawings);
drawingRouter.post('/drawing/addView', drawingController.addView);
drawingRouter.post('/drawing/addComment', auth, drawingController.addComment);
drawingRouter.post('/drawing/addLike', auth, drawingController.addLike);
drawingRouter.post('/drawing/addDisLike', auth, drawingController.addDisLike);
drawingRouter.delete('/drawing/removeLike', auth, drawingController.removeLike);
drawingRouter.delete('/drawing/removeDisLike', auth, drawingController.removeDisLike);
drawingRouter.delete('/drawing/removeComment', auth, drawingController.removeComment);
drawingRouter.patch('/drawing/editComment', auth, drawingController.editComment);
export default drawingRouter;
