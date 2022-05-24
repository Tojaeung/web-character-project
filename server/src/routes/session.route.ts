import { Router } from 'express';
import auth from '@middlewares/auth.middleware';
import { refreshLogin, signIn, signOut } from '@controllers/session.controller';
import validator from '@middlewares/validator.middleware';
import { signInSchema } from '@schemas/session.schema';
import asyncHandler from 'express-async-handler';

const router = Router();

router.post('/sessions', validator(signInSchema), asyncHandler(signIn));
router.get('/sessions', auth, asyncHandler(refreshLogin));
router.delete('/sessions', auth, asyncHandler(signOut));

export default router;
