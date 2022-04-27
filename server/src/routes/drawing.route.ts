import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import auth from '@src/middlewares/auth.middleware';
import penalty from '@src/middlewares/penalty.middleware';
import { drawingUpload } from '@src/helpers/s3.helper';
import validator from '@src/middlewares/validator.middleware';
import { deleteAccountSchema } from '@src/schemas/user.schema';
import {
  createCommentSchema,
  createDisLikeSchema,
  createLikeSchema,
  deleteCommentSchema,
  getDrawingsSchema,
  updateCommentSchema,
} from '@src/schemas/drawing.schema';
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
router.get('/drawings', validator(getDrawingsSchema), getDrawings);

router.delete('/drawings/:drawingId', auth, validator(deleteAccountSchema), deleteDrawing);

router.patch('/drawings/:drawingId/view', incrementView);

router.post('/drawings/:drawingId/comments', auth, penalty, validator(createCommentSchema), createComment);
router.patch('/drawings/comments/:commentId', auth, validator(updateCommentSchema), updateComment);
router.delete('/drawings/comments/:commentId', auth, validator(deleteCommentSchema), deleteComment);

router.post('/drawings/:drawingId/like', auth, penalty, validator(createLikeSchema), createLike);
router.post('/drawings/:drawingId/dislike', auth, penalty, validator(createDisLikeSchema), createDisLike);

export default router;
