import { Router } from 'express';
import postController from '@src/controllers/post.controller';
import auth from '@src/middlewares/auth.middleware';
import penalty from '@src/middlewares/penalty.middleware';
import { boardUpload } from '@src/helpers/s3.helper';

const postRouter = Router();

postRouter.post('/post/getPost', postController.getPost);
postRouter.post('/post/addView', postController.addView);

postRouter.post('/post/imageUpload', auth, boardUpload.single('image'), postController.imageUpload);
postRouter.post('/post/imageRemove', auth, postController.imageRemove);

postRouter.post('/post/addPost', auth, penalty, postController.addPost);
postRouter.patch('/post/editPost', auth, penalty, postController.editPost);
postRouter.delete('/post/removePost/:postId', auth, postController.removePost);

postRouter.post('/post/addComment', auth, penalty, postController.addComment);
postRouter.delete('/post/removeComment/:postCommentId', auth, postController.removeComment);
postRouter.patch('/post/editComment', auth, penalty, postController.editComment);

postRouter.post('/post/addLike', auth, penalty, postController.addLike);
postRouter.post('/post/addDisLike', auth, penalty, postController.addDisLike);

export default postRouter;
