import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { Photo } from '@src/entities/photo/photo.entity';
import { PhotoTag } from '@src/entities/photo/photoTag.entity';
import logger from '@src/helpers/winston.helper';
import { PhotoRepository, PhotoTagRepository } from '@src/repositorys/photo.repository';

const photoController = {
  create: async (req: Request, res: Response) => {
    try {
      const photoUrl = (req.file as Express.MulterS3.File).location;
      const photoKey = (req.file as Express.MulterS3.File).key;

      if (!photoUrl || !photoKey) {
        logger.info('그림 자료를 가져오지 못했습니다.');
        return res.status(200).json({ ok: false, message: '그림을 업로드 하지 않았습니다.' });
      }

      const id = req.session.user?.id;
      const { title, tags, content } = req.body;

      if (!title) {
        logger.info('제목을 입력하지 않았습니다.');
        return res.status(200).json({ ok: false, message: '제목을 입력하지 않았습니다.' });
      }

      // photo 테이블에 정보를 저장합니다.
      const photo = new Photo();
      photo.title = title;
      photo.content = content;
      photo.url = photoUrl;
      photo.key = photoKey;
      photo.user_id = Number(id);
      await getRepository(Photo).save(photo);

      // photoTag 테이블에 정보를 저장합니다.
      tags.forEach(async (tag: string) => {
        console.log({ tag });
        const photoTag = new PhotoTag();

        photoTag.tag = tag;
        photoTag.photo_id = photo.id;
        await getRepository(PhotoTag).save(photoTag);
      });

      logger.info('그림을 저장하였습니다.');
      return res.status(200).json({ ok: true, message: '그림을 저장하였습니다.' });
    } catch (err: any) {
      logger.info('그림저장 에러', err);
      return res.status(500).json({ ok: false, message: '그림저장 에러' });
    }
  },
  getPhotos: async (req: Request, res: Response) => {
    const photoRepo = getCustomRepository(PhotoRepository);
    const photoTagRepo = getCustomRepository(PhotoTagRepository);

    try {
      const { profileId } = req.body;
      const { cursor } = req.query;

      const photos = await photoRepo.findPhotoById(Number(profileId));

      // const photoTag = await photoTagRepo.findPhotoTagById(photo?.id as number);
      // // const comment = await

      logger.info('그림을 얻었습니다.');
      return res.status(200).json({ ok: true, message: '그림을 얻었습니다.', photos });
    } catch (err: any) {
      logger.info('그림 불러오기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 불러오기 에러' });
    }
  },
  edit: async (req: Request, res: Response) => {},
  delete: async (req: Request, res: Response) => {},
};

export default photoController;
