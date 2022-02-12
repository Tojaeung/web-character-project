import { Router } from 'express';
import profileController from '@src/controllers/profile.controller';
import auth from '@src/middlewares/auth.middleware';

const profileRouter = Router();

profileRouter.post('/profile/getUser', profileController.getUser);
profileRouter.post('/profile/follow', auth, profileController.follow);
profileRouter.post('/profile/unFollow', auth, profileController.unFollow);

export default profileRouter;
