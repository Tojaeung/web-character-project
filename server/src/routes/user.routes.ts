import { Router } from 'express';
import validator from '@src/middlewares/validator.middleware';
import asyncHandler from 'express-async-handler';
import { signUp, forgotPw, verifyUser, resetPw } from '@src/controllers/user.controller';
import { signUpSchema, forgotPwSchema, verifyUserSchema, resetPwSchema } from '@src/schemas/user.schema';

const router = Router();

router.post('/users', validator(signUpSchema), asyncHandler(signUp));
router.post('/users/forgot-pw', validator(forgotPwSchema), asyncHandler(forgotPw));
router.post('/users/:id/verify-user', validator(verifyUserSchema), asyncHandler(verifyUser));
router.patch('/users/:id/reset-pw', validator(resetPwSchema), asyncHandler(resetPw));

export default router;
