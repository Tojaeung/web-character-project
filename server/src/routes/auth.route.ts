import { Router } from 'express';
import authCtrl from '@src/controllers/auth.ctrl';

const authRouter = Router();

authRouter.post('/register', authCtrl.register);
authRouter.post('/login', authCtrl.login);
authRouter.post('/logout', authCtrl.logout);

export default authRouter;
