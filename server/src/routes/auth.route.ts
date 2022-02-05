import { Router } from 'express';
import authController from '@src/controllers/auth.controller';
import auth from '@src/middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/auth/register', authController.register);
authRouter.route('/auth/login').post(authController.login).get(auth, authController.refreshLogin);
authRouter.get('/auth/logout', auth, authController.logout);

// 회원가입 인증메일 API로 보내주는 라우터 입니다.
authRouter.get('/auth/verifyUser', authController.verifyUser);

// 비밀번호 찾는 API로 보내주는 라우터 입니다.
authRouter.post('/auth/findPw', authController.findPw);
authRouter.get('/auth/verifyPw', authController.verifyPw);
authRouter.post('/auth/changePw', authController.changePw);

export default authRouter;
