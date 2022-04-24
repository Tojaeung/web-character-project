import { Router } from 'express';
import validator from '@src/middlewares/validator.middleware';
import asyncHandler from 'express-async-handler';
import { signUp, verifyUser, forgotPw, resetPw } from '@src/controllers/user.controller';
import { signUpSchema, forgotPwSchema, verifyUserSchema, resetPwSchema } from '@src/schemas/user.schema';

const router = Router();

router.post('/users', validator(signUpSchema), asyncHandler(signUp));
router.patch('/users/verify-user', validator(verifyUserSchema), asyncHandler(verifyUser));

router.post('/users/forgot-pw', validator(forgotPwSchema), asyncHandler(forgotPw));
router.patch('/users/reset-pw', validator(resetPwSchema), asyncHandler(resetPw));

export default router;
