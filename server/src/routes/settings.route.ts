import { Router } from 'express';
import settingsController from '@src/controllers/settings.controller';
import auth from '@src/middlewares/auth.middleware';

const settingsRouter = Router();

settingsRouter.post('/settings/account/email', auth, settingsController.email);
settingsRouter.post('/settings/account/nickname', auth, settingsController.nickname);
settingsRouter.post('/settings/account/pw', auth, settingsController.pw);
settingsRouter.post('/settings/account/deleteAccount', auth, settingsController.deleteAccount);

export default settingsRouter;
