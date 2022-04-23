import { Router } from 'express';
import auth from '@src/middlewares/auth.middleware';
import { signIn, logOut } from '@src/controllers/session.controller';
import validator from '@src/middlewares/validator.middleware';
import { signInSchema } from '@src/schemas/session.schema';
import asyncHandler from 'express-async-handler';

const router = Router();

router.post('/sessions', validator(signInSchema), asyncHandler(signIn));
router.delete('/sessions', auth, asyncHandler(logOut));

export default router;
