import { Router } from 'express';
import drawingController from '@src/controllers/drawing.controller';
import auth from '@src/middlewares/auth.middleware';
import { drawingUpload } from '@src/helpers/s3.helper';

const drawingRouter = Router();

drawingRouter.post('/drawing/create', auth, drawingUpload.single('drawing'), drawingController.create);
drawingRouter.post('/drawing/getDrawings', drawingController.getDrawings);
drawingRouter.post('/drawing/getDrawing', drawingController.getDrawing);
drawingRouter.post('/drawing/addComment', auth, drawingController.addComment);
drawingRouter.post('/drawing/addLike', auth, drawingController.addLike);
drawingRouter.post('/drawing/addDisLike', auth, drawingController.addDisLike);
drawingRouter.post('/drawing/removeLike', auth, drawingController.removeLike);
drawingRouter.post('/drawing/removeDisLike', auth, drawingController.removeDisLike);

export default drawingRouter;
