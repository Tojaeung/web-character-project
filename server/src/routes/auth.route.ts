import { Router } from 'express';
import authController from '@src/controllers/auth.controller';
import jwtAuth from '@src/middlewares/jwt.middleware';

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/logout', jwtAuth, authController.logout);
authRouter.get('/verifyUser', authController.verifyUser);

export default authRouter;
