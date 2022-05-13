import express from 'express';
import board from '@src/routes/board.route';
import post from '@src/routes/post.route';
import chat from '@src/routes/chat.route';
import drawing from '@src/routes/drawing.route';
import session from '@src/routes/session.route';
import user from '@src/routes/user.route';
import me from '@src/routes/me.route';

const router = express.Router();

router.use(user);
router.use(board);
router.use(post);
router.use(chat);
router.use(drawing);
router.use(session);
router.use(me);

export default router;
