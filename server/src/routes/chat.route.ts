import { Router, Request, Response } from 'express';
import { chatUpload } from '@src/helpers/s3.helper';
import logger from '@src/helpers/winston.helper';
import ApiError from '@src/errors/api.error';

const chatRouter = Router();

interface ImgMsgObjType {
  type: string;
  to: string;
  from: string;
  content: string;
  imgKey: string;
  date: string;
}

chatRouter.post('/chat/imgMessage', chatUpload.single('imgMessage'), (req: Request, res: Response) => {
  const { chatUserId, chatId, messageDate } = req.body;
  const imgUrl = (req.file as Express.MulterS3.File).location;
  const imgKey = (req.file as Express.MulterS3.File).key;

  if (!imgUrl || !imgKey) {
    logger.error('s3-multer에서 채팅 이미지 정보를 가져오지 못했습니다. ');
    throw ApiError.InternalServerError('내부적인 문제로 채팅파일을 업로드하지 못했습니다.');
  }

  const imgMsgObj: ImgMsgObjType = {
    type: 'image',
    to: chatUserId,
    from: chatId,
    content: imgUrl,
    imgKey,
    date: messageDate,
  };

  return res.status(200).json({ ok: true, imgMsgObj });
});

export default chatRouter;
