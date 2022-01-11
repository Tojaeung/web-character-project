import { Request } from 'express';

export const mailOption = {
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

export const generatEmailForm = (req: Request, email: string) => {
  return {
    from: process.env.MY_MAIL,
    to: email,
    subject: '안뇽~',
    html: `<h3 style="background-color: green; text-align: center; color: pink;">안녕하세요. 캐릭캐릭체인지에 가입해주셔서 감사합니다.</h3>
    <a href='http://${req.headers.host}/api/verifyUser?email=${email}'>Verify your email</a>`,
  };
};
