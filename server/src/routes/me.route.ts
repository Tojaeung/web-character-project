import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import validator from '@src/middlewares/validator.middleware';
import auth from '@src/middlewares/auth.middleware';
import { avatarUpload, coverUpload } from '@src/helpers/s3.helper';
import {
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
} from '@src/controllers/user.controller';
import { getAllMyPosts, getAllMyComments } from '@src/controllers/board.controller';
import { verifyEmailSchema, updateNicknameSchema, updatePwSchema, updateDescSchema } from '@src/schemas/user.schema';

const router = Router();

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

// 유저 자신이 작성한 게시글, 댓글 요청
router.get('/me/posts', asyncHandler(getAllMyPosts));
router.get('/me/comments', asyncHandler(getAllMyComments));

// 계정삭제
router.delete('/me', auth, asyncHandler(deleteAccount));

export default router;
