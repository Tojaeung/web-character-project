import { Request, Response } from 'express';
import { createTransport } from 'nodemailer';
import logger from '@src/config/winston';

export const sendEmail = async (req: Request, res: Response, email: string) => {
  const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.MY_MAIL,
    to: email,
    subject: '안뇽~',
    html: `<h3 style="background-color: green; text-align: center; color: pink;">안녕하세요. 캐릭캐릭체인지에 가입해주셔서 감사합니다.</h3>
      <a href='http://${req.headers.host}/api/verifyUser?email=${email}'>Verify your email</a>`,
  });

  if (!info) {
    logger.error('이메일 송신 실패하였습니다.');
    return res.status(500).json({ status: false, message: '이메일 송신 에러' });
  } else {
    logger.info('이메일 송신 성공하였습니다.');
  }

  return;
};
