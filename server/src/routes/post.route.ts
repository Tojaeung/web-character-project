import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import validator from '@src/middlewares/validator.middleware';
import auth from '@src/middlewares/auth.middleware';
import penalty from '@src/middlewares/penalty.middleware';
import { boardUpload } from '@src/helpers/s3.helper';
import {
  createCommentSchema,
  createDisLikeSchema,
  createLikeSchema,
  createPostSchema,
  removeImageKeySchema,
  updateCommentSchema,
  updatePostSchema,
} from '@src/schemas/board.schema';
import {
  getPost,
  createComment,
  createDislike,
  createLike,
  createPost,
  updateComment,
  updatePost,
  deleteComment,
  deletePost,
  addImageKey,
  removeImageKey,
} from '@src/controllers/post.controller';

const router = Router();

// 조회수 같이
router.get('/posts/:postId', asyncHandler(getPost));

// 게시물 생성
router.post('/boards/:board/posts', auth, penalty, validator(createPostSchema), asyncHandler(createPost));
// 게시물 변경
router.patch('/posts/:postId', auth, validator(updatePostSchema), asyncHandler(updatePost));
// 게시물 삭제
router.delete('/posts/:postId', auth, asyncHandler(deletePost));

// 게시물 댓글 생성
router.post(
  '/boards/:board/posts/:postId/comments',
  auth,
  penalty,
  validator(createCommentSchema),
  asyncHandler(createComment)
);
// 게시물 댓글 변경
router.patch('/comments/:commentId', auth, validator(updateCommentSchema), asyncHandler(updateComment));
// 게시물 댓글 삭제
router.delete('/comments/:commentId', auth, asyncHandler(deleteComment));

// 게시물 좋아요 생성
router.post('/posts/:postId/like', auth, penalty, validator(createLikeSchema), asyncHandler(createLike));
// 게시물 싫어요 생성
router.post('/posts/:postId/dislike', auth, penalty, validator(createDisLikeSchema), asyncHandler(createDislike));

// 게시글 이미지 업로드 할시
router.post('/posts/add-imagekey', auth, penalty, boardUpload.single('newImage'), asyncHandler(addImageKey));
// 게시글 이미지 업로드 안할시
router.post('/posts/remove-imagekey', auth, penalty, validator(removeImageKeySchema), asyncHandler(removeImageKey));

export default router;
