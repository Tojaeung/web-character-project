import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import auth from '@middlewares/auth.middleware';
import penalty from '@middlewares/penalty.middleware';
import { drawingUpload } from '@helpers/s3.helper';
import validator from '@middlewares/validator.middleware';
import {
  createDrawingSchema,
  createCommentSchema,
  updateCommentSchema,
  createLikeSchema,
  createDisLikeSchema,
} from '@schemas/drawing.schema';
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
} from '@controllers/drawing.controller';

const router = Router();

router.post(
  '/drawings',
  auth,
  penalty,
  drawingUpload.single('newDrawing'),
  validator(createDrawingSchema),
  asyncHandler(createDrawing)
);
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

router.post('/drawings/:drawingId/like', auth, penalty, validator(createLikeSchema), asyncHandler(createLike));
router.post('/drawings/:drawingId/dislike', auth, penalty, validator(createDisLikeSchema), asyncHandler(createDisLike));

export default router;
