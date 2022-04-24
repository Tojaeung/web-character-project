import { Router } from 'express';
import settingsController from '@src/controllers/settings.controller';
import auth from '@src/middlewares/auth.middleware';
import penalty from '@src/middlewares/penalty.middleware';
import { avatarUpload, coverUpload } from '@src/helpers/s3.helper';

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

settingsRouter.post('/settings/account/editCover', auth, coverUpload.single('newCover'), settingsController.editCover);
settingsRouter.get('/settings/account/defaultCover', auth, settingsController.defaultCover);

settingsRouter.delete('/settings/account/delAccount', auth, penalty, settingsController.delAccount);

settingsRouter.get('/settings/account/verifyEmail', settingsController.verifyEmail);

settingsRouter.post('/settings/editDesc', auth, settingsController.editDesc);

export default settingsRouter;
