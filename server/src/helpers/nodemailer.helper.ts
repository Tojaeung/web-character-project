import { Request, Response } from 'express';
import { createTransport } from 'nodemailer';
import logger from '@src/helpers/winston.helper';

export const sendRegisterEmail = async (req: Request, res: Response, email: string, emailToken: string) => {
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
      <a href='http://${req.headers.host}/api/auth/verifyUser?emailToken=${emailToken}'>Verify your email</a>`,
  });

  if (!info) {
    logger.error('이메일 송신 실패하였습니다.');
    return res.status(500).json({ message: '이메일 송신 에러' });
  } else {
    logger.info('이메일 송신 성공하였습니다.');
  }

  return;
};

export const sendFindEmail = async (req: Request, res: Response, email: string, pwToken: string) => {
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
    html: `<h3 style="background-color: green; text-align: center; color: pink;">비밀번호 재설정을 위해서 아래의 버튼을 눌러주세요.</h3>
      <a href='http://${req.headers.host}/api/auth/verifyPw?pwToken=${pwToken}'>Verify your email</a>`,
  });

  if (!info) {
    logger.error('이메일 송신 실패하였습니다.');
    return res.status(500).json({ status: false, message: '이메일 송신 에러' });
  } else {
    logger.info('이메일 송신 성공하였습니다.');
  }

  return;
};

export const sendChangeEmail = async (
  req: Request,
  res: Response,
  newEmail: string,
  currentEmail: string | undefined
) => {
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
    to: newEmail,
    subject: '안뇽~',
    html: `<h3 style="background-color: green; text-align: center; color: pink;">이메일 변경을 위해서 아래의 버튼을 눌러주세요.</h3>
      <a href='http://${req.headers.host}/api/settings/account/verifyEmail?newEmail=${newEmail}&currentEmail=${currentEmail}'>Verify your email</a>`,
  });

  if (!info) {
    logger.error('이메일 송신 실패하였습니다.');
    return res.status(500).json({ status: false, message: '이메일 송신 에러' });
  } else {
    logger.info('이메일 송신 성공하였습니다.');
  }

  return;
};
