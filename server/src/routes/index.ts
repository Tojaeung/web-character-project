import express from 'express';
import auth from '@src/routes/auth.routes';
import board from '@src/routes/board.routes';
import chat from '@src/routes/chat.routes';
import drawing from '@src/routes/drawing.routes';
import etc from '@src/routes/etc.routes';
import post from '@src/routes/post.routes';
import profile from '@src/routes/profile.routes';
import settings from '@src/routes/settings.routes';

const router = express.Router();

router.use(auth);
router.use(board);
router.use(chat);
router.use(drawing);
router.use(etc);
router.use(post);
router.use(profile);
router.use(settings);

export default router;
