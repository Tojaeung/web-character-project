import { Router } from 'express';
import photoController from '@src/controllers/photo.controller';
import auth from '@src/middlewares/auth.middleware';
import { photoUpload } from '@src/helpers/s3.helper';

const photoRouter = Router();

photoRouter.post('/photo/create', auth, photoUpload.single('photo'), photoController.create);
photoRouter.post('/photo/getPhotos', photoController.getPhotos);

export default photoRouter;
