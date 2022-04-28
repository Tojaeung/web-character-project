import { createTransport } from 'nodemailer';
import logger from '@src/helpers/winston.helper';
import ApiError from '@src/errors/api.error';

// 회원가입시, 이메일 인증 메일이다. (인증 메일을 확인해야 로그인이 가능하다.)
export const sendAuthEmail = async (email: string, emailToken: string) => {
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
    subject: '<i>그림러들</i> 회원가입 인증메일 입니다.',
    html: `<h2>안녕하세요. <i>그림러들</i>에 가입해주셔서 감사합니다.</h2>
    <p>아래 링크를 클릭하면, 그림러들 홈페이지로 돌아갑니다.</p>
    <p>그 다음, 로그인이 가능합니다.</p>
      <a href='http://${process.env.SERVER_ADDR}/api/users/verify-user?emailToken=${emailToken}'>이메일 인증 확인</a>`,
  });

  if (!info) {
    logger.error('이메일 인증메일 보내기 실패하였습니다.');
    throw ApiError.InternalServerError('내부적인 문제로 회원가입 인증메일 보내기 실패하였습니다.');
  }
  logger.info('회원가입 인증메일 보내기 성공하였습니다.');
};

// 잊어버린 비밀번호를 찾는과정에서, 비밀번호를 재설정하기위해 메일인증이 필요합니다.
export const sendEmailForResetPw = async (email: string, pwToken: string) => {
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
    subject: '<i>그림러들</i> 비밀번호 찾기 인증메일 입니다.',
    html: `<h2>비밀번호를 잊어버리셨군요?</h2>
    <p>아래 링크를 클릭하면, 비밀번호 재설정 페이지로 이동합니다.</p>
    <a href='${process.env.CLIENT_ADDR}/resetPw?pwToken=${pwToken}'>비밀번호 재설정하기</a>,`,
  });

  if (!info) {
    logger.error('비밀번호 재설정을 위한 이메일 보내기 실패하였습니다.');
    throw ApiError.InternalServerError('내부적인 문제로 비밀번호 재설정을 위한 이메일 보내기 실패하였습니다.');
  }
  logger.info('비밀번호 재설정을 위한 인증메일 보내기 성공하였습니다.');
};

// 이메일 변경을 위한 인증메일 입니다.
export const sendEmailForUpdateEmail = async (userId: number, updatedEmail: string) => {
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
    to: updatedEmail,
    subject: '<i>그림러들</i> 이메일변경을 위한 인증메일 입니다.',
    html: `<h2>이메일 변경하기</h2>
    <p>아래 링크를 클릭하면, 그림러들 홈페이지로 이동합니다.</p>
    <p>그 다음, 새로운 이메일로 로그인을 시도해주세요.</p>
    <a href='http://${process.env.SERVER_ADDR}/api/users/${userId}/updatedEmail=${updatedEmail}&'>이메일 변경완료</a>`,
  });

  if (!info) {
    logger.error('이메일 을 위한 인증메일 보내기 실패하였습니다.');
    throw ApiError.InternalServerError('이메일 을 위한 인증메일 보내기 실패하였습니다.');
  }
  logger.info('이메일 변경을 위한 인증메일 보내기 성공하였습니다.');
};
