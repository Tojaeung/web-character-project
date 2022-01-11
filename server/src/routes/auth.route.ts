import { Router } from 'express';
import authController from '@src/controllers/auth.controller';
import jwtAuth from '@src/middlewares/jwt.middleware';

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/logout', jwtAuth, authController.logout);

// 회원가입 인증메일 API로 보내주는 라우터 입니다.
authRouter.get('/verifyUser', authController.verifyUser);

// 비밀번호 찾는 API로 보내주는 라우터 입니다.
authRouter.post('/findPw', authController.findPw);
authRouter.get('/verifyPw', authController.verifyPw);
authRouter.post('/changePw', authController.changePw);

export default authRouter;
