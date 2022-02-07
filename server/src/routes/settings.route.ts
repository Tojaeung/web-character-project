import { Router } from 'express';
import settingsController from '@src/controllers/settings.controller';
import auth from '@src/middlewares/auth.middleware';
import { avatarUpload } from '@src/helpers/s3.helper';

const settingsRouter = Router();

settingsRouter.post('/settings/account/email', auth, settingsController.email);
settingsRouter.post('/settings/account/nickname', auth, settingsController.nickname);
settingsRouter.post('/settings/account/pw', auth, settingsController.pw);
settingsRouter.post('/settings/account/avatar', auth, avatarUpload.single('newAvatar'), settingsController.avatar);
settingsRouter.get('/settings/account/defaultAvatar', auth, settingsController.defaultAvatar);

settingsRouter.get('/settings/account/delAccount', auth, settingsController.delAccount);

settingsRouter.get('/settings/account/verifyEmail', settingsController.verifyEmail);

export default settingsRouter;
