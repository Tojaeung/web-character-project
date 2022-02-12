import { Router } from 'express';
import settingsController from '@src/controllers/settings.controller';
import auth from '@src/middlewares/auth.middleware';
import { avatarUpload } from '@src/helpers/s3.helper';

const settingsRouter = Router();

settingsRouter.post('/settings/account/editEmail', auth, settingsController.editEmail);
settingsRouter.post('/settings/account/editNickname', auth, settingsController.editNickname);
settingsRouter.post('/settings/account/editPw', auth, settingsController.editPw);
settingsRouter.post(
  '/settings/account/editAvatar',
  auth,
  avatarUpload.single('newAvatar'),
  settingsController.editAvatar
);
settingsRouter.get('/settings/account/defaultAvatar', auth, settingsController.defaultAvatar);

settingsRouter.get('/settings/account/delAccount', auth, settingsController.delAccount);

settingsRouter.get('/settings/account/verifyEmail', settingsController.verifyEmail);

settingsRouter.post('/settings/editDesc', settingsController.editDesc);

export default settingsRouter;
