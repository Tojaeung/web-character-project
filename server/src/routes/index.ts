import express from 'express';
import board from '@src/routes/board.route';
import chat from '@src/routes/chat.route';
import drawing from '@src/routes/drawing.route';
import etc from '@src/routes/etc.route';
import session from '@src/routes/session.route';
import user from '@src/routes/user.route';

const router = express.Router();

router.use(user);
router.use(board);
router.use(chat);
router.use(drawing);
router.use(etc);
router.use(session);

export default router;
