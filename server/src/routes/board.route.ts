import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import validator from '@src/middlewares/validator.middleware';
import auth from '@src/middlewares/auth.middleware';
import penalty from '@src/middlewares/penalty.middleware';
import { boardUpload } from '@src/helpers/s3.helper';
import {
  createCommentSchema,
  createDisLikeSchema,
  createImageKeySchema,
  createLikeSchema,
  createPostSchema,
  deleteCommentSchema,
  deleteImageKeySchema,
  getBoardSchema,
  getPostSchema,
  updateCommentSchema,
  updatePostSchema,
} from '@src/schemas/board.schema';
import {
  addImageKey,
  createPost,
  removeImageKey,
  getAllBoards,
  getBoard,
  getPost,
  updatePost,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
  createLike,
  createDisLike,
} from '@src/controllers/board.controller';

const router = Router();

router.get('/boards', asyncHandler(getAllBoards));
router.get('/boards/:board', validator(getBoardSchema), asyncHandler(getBoard));

// 조회수 같이
router.get('/boards/:board/posts/:id', validator(getPostSchema), asyncHandler(getPost));

// 게시글 이미지 업로드 할시
router.post(
  '/boards/:board/posts/image',
  auth,
  penalty,
  validator(createImageKeySchema),
  boardUpload.single('newImage'),
  asyncHandler(addImageKey)
);
// 게시글 이미지 업로드 안할시
router.post('/boards/:board/posts/image', auth, penalty, validator(deleteImageKeySchema), asyncHandler(removeImageKey));

// 게시물 생성
router.post('/boards/:board/posts', auth, penalty, validator(createPostSchema), asyncHandler(createPost));
// 게시물 변경
router.patch('/boards/:board/posts/:postId', auth, validator(updatePostSchema), asyncHandler(updatePost));
// 게시물 삭제
router.delete('/boards/:board/posts/:postId', auth, validator(deleteImageKeySchema), asyncHandler(deletePost));

// 게시물 댓글 생성
router.post(
  '/boards/:board/posts/:postId/comments',
  auth,
  penalty,
  validator(createCommentSchema),
  asyncHandler(createComment)
);
// 게시물 댓글 변경
router.patch('/boards/:board/comments/:commentId', auth, validator(updateCommentSchema), asyncHandler(updateComment));
// 게시물 댓글 삭제
router.delete('/boards/:board/comments/:commentId', auth, validator(deleteCommentSchema), asyncHandler(deleteComment));

// 게시물 좋아요 생성
router.post('/boards/:board/posts/:id/like', auth, penalty, validator(createLikeSchema), asyncHandler(createLike));
// 게시물 싫어요 생성
router.post(
  '/boards/:board/posts/:id/dislike',
  auth,
  penalty,
  validator(createDisLikeSchema),
  asyncHandler(createDisLike)
);

export default router;
