import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import validator from '@src/middlewares/validator.middleware';
import auth from '@src/middlewares/auth.middleware';
import admin from '@src/middlewares/admin.middleware';

import {
  signUp,
  verifyUser,
  forgotPw,
  resetPw,
  verifyEmail,
  updateEmail,
  updateNickname,
  updatePw,
  updateDesc,
  updateAvatar,
  updateDefaultAvatar,
  updateCover,
  updateDefaultCover,
  deleteAccount,
  getUser,
  sendReport,
  getUserInfo,
  givePenalty,
} from '@src/controllers/user.controller';
import {
  signUpSchema,
  forgotPwSchema,
  resetPwSchema,
  verifyEmailSchema,
  updateNicknameSchema,
  updatePwSchema,
  updateDescSchema,
} from '@src/schemas/user.schema';

const router = Router();

// 회원가입, 그에 따른 이메일 인증
router.post('/users', validator(signUpSchema), asyncHandler(signUp));
router.get('/users/verify-user', asyncHandler(verifyUser));

// 비밀번호 찾기, 그에 따른 비밀번호 재설정
router.post('/users/forgot-pw', validator(forgotPwSchema), asyncHandler(forgotPw));
router.patch('/users/reset-pw', validator(resetPwSchema), asyncHandler(resetPw));

// 유저정보 가져오기 (프로필 유저정보 가져올때 사용)
router.get('/users/:userId', asyncHandler(getUser));

// 유저 신고하기
router.post('/users/:userId/report', auth, asyncHandler(sendReport));

// 유저정보 가져오기
router.get('/users/:userId/info', asyncHandler(getUserInfo));

// 유저 제재하기
router.patch('/users/:userId/exp', auth, admin, asyncHandler(givePenalty));

export default router;
