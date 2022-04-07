import { Router } from 'express';
import postController from '@src/controllers/post.controller';
import auth from '@src/middlewares/auth.middleware';
import { boardUpload } from '@src/helpers/s3.helper';

const postRouter = Router();

postRouter.post('/post/getPost', postController.getPost);

postRouter.post('/post/imageUpload', auth, boardUpload.single('image'), postController.imageUpload);
postRouter.post('/post/imageRemove', auth, postController.imageRemove);

postRouter.post('/post/addPost', auth, postController.addPost);
postRouter.post('/post/addPostComment', auth, postController.addPostComment);

export default postRouter;
