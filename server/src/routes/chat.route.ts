import { Router, Request, Response } from 'express';
import { chatUpload, s3 } from '@src/helpers/s3.helper';

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
