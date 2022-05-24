import express from 'express';
import board from '@routes/board.route';
import post from '@routes/post.route';
import chat from '@routes/chat.route';
import drawing from '@routes/drawing.route';
import session from '@routes/session.route';
import user from '@routes/user.route';
import me from '@routes/me.route';

const router = express.Router();

router.use(user);
router.use(board);
router.use(post);
router.use(chat);
router.use(drawing);
router.use(session);
router.use(me);

export default router;
