import { Router } from 'express';
import drawingController from '@src/controllers/drawing.controller';
import auth from '@src/middlewares/auth.middleware';
import { drawingUpload } from '@src/helpers/s3.helper';

const drawingRouter = Router();

drawingRouter.post('/drawing/getDrawings', drawingController.getDrawings);
drawingRouter.post('/drawing/create', auth, drawingUpload.single('drawing'), drawingController.create);

export default drawingRouter;
