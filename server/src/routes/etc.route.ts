import { Router } from 'express';
import etcController from '@src/controllers/etc.controller';
import auth from '@src/middlewares/auth.middleware';
import admin from '@src/middlewares/admin.middleware';

const etcRouter = Router();

etcRouter.post('/etc/sendReport', auth, etcController.sendReport);
etcRouter.post('/etc/getUserInfo', etcController.getUserInfo);
etcRouter.post('/etc/calcExp', auth, etcController.calcExp);
etcRouter.delete('/etc/penaltyByAdmin', auth, admin, etcController.penaltyByAdmin);

export default etcRouter;
