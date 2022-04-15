import { Router } from 'express';
import etcController from '@src/controllers/etc.controller';
import auth from '@src/middlewares/auth.middleware';

const etcRouter = Router();

etcRouter.post('/etc/sendReport', auth, etcController.sendReport);
etcRouter.post('/etc/getUserInfo', etcController.getUserInfo);
etcRouter.post('/etc/calcExp', etcController.calcExp);

export default etcRouter;
