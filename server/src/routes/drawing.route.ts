import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import auth from '@src/middlewares/auth.middleware';
import penalty from '@src/middlewares/penalty.middleware';
import { drawingUpload } from '@src/helpers/s3.helper';
import validator from '@src/middlewares/validator.middleware';
import { createCommentSchema, updateCommentSchema } from '@src/schemas/drawing.schema';
import {
  createComment,
  createDisLike,
  createDrawing,
  createLike,
  updateComment,
  deleteComment,
  deleteDrawing,
  getDrawings,
  incrementView,
} from '@src/controllers/drawing.controller';

const router = Router();

router.post('/drawings', auth, penalty, drawingUpload.single('newDrawing'), asyncHandler(createDrawing));
router.get('/drawings/users/:userId', asyncHandler(getDrawings));

router.delete('/drawings/:drawingId', auth, asyncHandler(deleteDrawing));

router.patch('/drawings/:drawingId/view', asyncHandler(incrementView));

router.post(
  '/drawings/:drawingId/comments',
  auth,
  penalty,
  validator(createCommentSchema),
  asyncHandler(createComment)
);
router.patch('/drawings/comments/:commentId', auth, validator(updateCommentSchema), asyncHandler(updateComment));
router.delete('/drawings/comments/:commentId', auth, asyncHandler(deleteComment));

router.post('/drawings/:drawingId/like', auth, penalty, asyncHandler(createLike));
router.post('/drawings/:drawingId/dislike', auth, penalty, asyncHandler(createDisLike));

export default router;
