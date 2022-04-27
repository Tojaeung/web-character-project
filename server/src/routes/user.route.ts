import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import validator from '@src/middlewares/validator.middleware';
import auth from '@src/middlewares/auth.middleware';
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
} from '@src/controllers/user.controller';
import {
  signUpSchema,
  forgotPwSchema,
  verifyUserSchema,
  resetPwSchema,
  verifyEmailSchema,
  updateEmailSchema,
  updateNicknameSchema,
  updatePwSchema,
  updateDescSchema,
  updateAvatarSchema,
  updateDefaultAvatarSchema,
  updateCoverSchema,
  updateDefaultCoverSchema,
  deleteAccountSchema,
  getUserSchema,
} from '@src/schemas/user.schema';

const router = Router();

// 회원가입, 그에 따른 이메일 인증
router.post('/users', validator(signUpSchema), asyncHandler(signUp));
router.patch('/users/verify-user', validator(verifyUserSchema), asyncHandler(verifyUser));

// 비밀번호 찾기, 그에 따른 비밀번호 재설정
router.post('/users/forgot-pw', validator(forgotPwSchema), asyncHandler(forgotPw));
router.patch('/users/reset-pw', validator(resetPwSchema), asyncHandler(resetPw));

// 이메일 변경, 그에따른 이메일 인증
router.post('/users/verify-email', auth, validator(verifyEmailSchema), asyncHandler(verifyEmail));
router.patch('/users/email', auth, validator(updateEmailSchema), asyncHandler(updateEmail));

// 유저정보 가져오기 (프로필 유저정보 가져올때 사용)
router.get('/users/:userId', validator(getUserSchema), asyncHandler(getUser));

// 유저정보 변경
router.patch('/users/nickname', auth, validator(updateNicknameSchema), asyncHandler(updateNickname));
router.patch('/users/pw', auth, validator(updatePwSchema), asyncHandler(updatePw));
router.patch('/users/desc', auth, validator(updateDescSchema), asyncHandler(updateDesc));

// 유저 프로필, 커버 사진 변경
router.patch(
  '/users/avatar',
  auth,
  validator(updateAvatarSchema),
  avatarUpload.single('newAvatar'),
  asyncHandler(updateAvatar)
);
router.patch('/users/default-avatar', auth, validator(updateDefaultAvatarSchema), asyncHandler(updateDefaultAvatar));
router.patch(
  '/users/cover',
  auth,
  coverUpload.single('newCover'),
  validator(updateCoverSchema),
  asyncHandler(updateCover)
);
router.patch('/users/default-cover', auth, validator(updateDefaultCoverSchema), asyncHandler(updateDefaultCover));

// 계정삭제
router.delete('/users', auth, validator(deleteAccountSchema), asyncHandler(deleteAccount));

export default router;
