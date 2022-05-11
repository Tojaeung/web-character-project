import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import validator from '@src/middlewares/validator.middleware';
import auth from '@src/middlewares/auth.middleware';
import admin from '@src/middlewares/admin.middleware';
import { avatarUpload, coverUpload } from '@src/helpers/s3.helper';
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

// 이메일 변경, 그에따른 이메일 인증
router.patch('/me/verify-email', auth, validator(verifyEmailSchema), asyncHandler(verifyEmail));
router.patch('/users/:userId/email', asyncHandler(updateEmail));

// 유저정보 변경
router.patch('/me/nickname', validator(updateNicknameSchema), asyncHandler(updateNickname));
router.patch('/me/pw', auth, validator(updatePwSchema), asyncHandler(updatePw));
router.patch('/me/desc', auth, validator(updateDescSchema), asyncHandler(updateDesc));

// 유저 프로필, 커버 사진 변경
router.patch('/me/avatar', auth, avatarUpload.single('updatedAvatar'), asyncHandler(updateAvatar));
router.patch('/me/default-avatar', auth, asyncHandler(updateDefaultAvatar));
router.patch('/me/cover', auth, coverUpload.single('updatedCover'), asyncHandler(updateCover));
router.patch('/me/default-cover', auth, asyncHandler(updateDefaultCover));

// 유저 신고하기
router.post('/users/:userId/report', auth, asyncHandler(sendReport));

// 유저정보 가져오기
router.get('/users/:userId/info', asyncHandler(getUserInfo));

// 유저 제재하기
router.patch('/users/:userId/exp', auth, admin, asyncHandler(givePenalty));

// 계정삭제
router.delete('/me', auth, asyncHandler(deleteAccount));

export default router;
