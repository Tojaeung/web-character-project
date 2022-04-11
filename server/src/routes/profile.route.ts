import { Router } from 'express';
import profileController from '@src/controllers/profile.controller';
import auth from '@src/middlewares/auth.middleware';

const profileRouter = Router();

profileRouter.post('/profile/getProfile', profileController.getProfile);

export default profileRouter;
