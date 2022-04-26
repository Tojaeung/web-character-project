import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import validator from '@src/middlewares/validator.middleware';
import { getBoardSchema } from '@src/schemas/board.schema';
import { getAllBoards, getBoard } from '@src/controllers/board.controller';

const router = Router();

router.get('/boards', asyncHandler(getAllBoards));
router.get('/boards/:board', validator(getBoardSchema), asyncHandler(getBoard));

export default router;
