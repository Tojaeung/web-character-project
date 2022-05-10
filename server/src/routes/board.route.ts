import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllBoards, getBoard } from '@src/controllers/board.controller';

const router = Router();

router.get('/boards', asyncHandler(getAllBoards));
router.get('/boards/:board', asyncHandler(getBoard));

export default router;
