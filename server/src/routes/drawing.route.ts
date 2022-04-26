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
} from '@src/schemas/drawing.schema';
import {
  createComment,
  createDisLike,
  createDrawing,
  createLike,
  deleteComment,
  deleteDrawing,
  getDrawings,
  incrementView,
} from '@src/controllers/drawing.controller';

const router = Router();

router.post('/drawings/users/:id', auth, penalty, drawingUpload.single('newDrawing'), asyncHandler(createDrawing));
router.get('/drawings/users/:id', validator(getDrawingsSchema), getDrawings);

router.delete('/drawings/:id', auth, validator(deleteAccountSchema), deleteDrawing);

router.patch('/drawings/:id/view', incrementView);

router.post('/drawings/:drawingId/users/:userId/like', auth, penalty, validator(createLikeSchema), createLike);
router.post('/drawings/:drawingId/users/:userId/dislike', auth, penalty, validator(createDisLikeSchema), createDisLike);

router.post(
  '/drawings/:drawingId/users/:userId/comments',
  auth,
  penalty,
  validator(createCommentSchema),
  createComment
);
router.delete('/drawings/comments/:id', auth, validator(deleteCommentSchema), deleteComment);

export default router;
