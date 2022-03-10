import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import logger from '@src/helpers/winston.helper';
import { DrawingRepository, TagRepository } from '@src/repositorys/drawing.repository';
import { Drawing } from '@src/entities/drawing/drawing.entity';
import { Tag } from '@src/entities/drawing/tag.entity';

const drawingController = {
  create: async (req: Request, res: Response) => {
    try {
      const drawingUrl = (req.file as Express.MulterS3.File).location;
      const drawingKey = (req.file as Express.MulterS3.File).key;

      if (!drawingUrl || !drawingKey) {
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
      const drawing = new Drawing();
      drawing.title = title;
      drawing.content = content;
      drawing.url = drawingUrl;
      drawing.key = drawingKey;
      drawing.user_id = Number(id);
      await getRepository(Drawing).save(drawing);

      // photoTag 테이블에 정보를 저장합니다.
      tags.forEach(async (tag: string) => {
        const drawingTag = new Tag();

        drawingTag.tag = tag;
        drawingTag.drawing_id = drawing.id;
        await getRepository(Drawing).save(drawingTag);
      });

      logger.info('그림을 저장하였습니다.');
      return res.status(200).json({ ok: true, message: '그림을 저장하였습니다.' });
    } catch (err: any) {
      logger.info('그림저장 에러', err);
      return res.status(500).json({ ok: false, message: '그림저장 에러' });
    }
  },
  getDrawings: async (req: Request, res: Response) => {
    const drawingRepo = getCustomRepository(DrawingRepository);
    const tagRepo = getCustomRepository(TagRepository);

    try {
      const { profileId } = req.body;
      const { cursor } = req.query;

      const drawings = await drawingRepo.findPhotoById(profileId);

      logger.info('그림을 얻었습니다.');
      return res.status(200).json({ ok: true, message: '그림을 얻었습니다.', drawings });
    } catch (err: any) {
      logger.info('그림 불러오기 에러', err);
      return res.status(500).json({ ok: false, message: '그림 불러오기 에러' });
    }
  },
  edit: async (req: Request, res: Response) => {},
  delete: async (req: Request, res: Response) => {},
};

export default drawingController;
