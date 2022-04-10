import { Router } from 'express';
import reportController from '@src/controllers/report.controller';
import auth from '@src/middlewares/auth.middleware';

const reportRouter = Router();

reportRouter.post('/report/send', auth, reportController.sendReport);

export default reportRouter;
