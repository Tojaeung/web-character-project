import { Router } from 'express';
import profileController from '@src/controllers/profile.controller';

const profileRouter = Router();

profileRouter.post('/profile/getProfile', profileController.getProfile);

export default profileRouter;
