import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import moment from 'moment';
import { IncomingWebhook } from '@slack/webhook';
import cluster from '@src/helpers/redis.helper';
import logger from '@src/helpers/winston.helper';
import ApiError from '@src/errors/api.error';
import s3Delete from '@src/utils/s3.utils';
import User from '@src/entities/profile/user.entity';
import Drawing from '@src/entities/drawing/drawing.entity';
import DrawingComment from '@src/entities/drawing/comment.entity';
import Post from '@src/entities/board/post.entity';
import Comment from '@src/entities/board/comment.entity';
import ImageKey from '@src/entities/board/imageKey.entity';
import Penalty from '@src/entities/penalty/penalty.entity';
import { UserRepository } from '@src/repositorys/user.repository';
import { sendAuthEmail, sendEmailForResetPw, sendEmailForUpdateEmail } from '@src/helpers/nodemailer.helper';

import {
  ForgotPwDTO,
  GetUserInfoDTO,
  GivePenaltyDTO,
  ResetPwDTO,
  SendReportDTO,
  SignUpDTO,
  UpdateDescDTO,
  UpdateNicknameDTO,
  UpdatePwDTO,
  VerifyEmailDTO,
} from '@src/schemas/user.schema';

export const signUp = async (req: Request<{}, {}, SignUpDTO>, res: Response): Promise<any> => {
  const { email, nickname, pw } = req.body;

  // 기존 이메일 존재 유무를 확인합니다.
  const isExistingEmail = await getRepository(User).count({ email });
  if (isExistingEmail) {
    logger.warn('이미 존재하는 이메일로 회원가입을 시도합니다.');
    throw ApiError.Conflict('이미 존재하는 이메일 입니다.');
  }

  // 기존 닉네임 존재 유무를 확인합니다.
  const isExistingNickname = await getRepository(User).count({ nickname });
  if (isExistingNickname) {
    logger.warn('이미 존재하는 닉네임으로 회원가입을 시도합니다.');
    throw ApiError.Conflict('이미 존재하는 닉네임 입니다.');
  }

  // 비밀번호를 암호화 합니다.
  const encryptedPw = await bcrypt.hash(pw, 8);
  const emailToken = await bcrypt.hash(email, 8);
  const pwToken = await bcrypt.hash(nickname, 8);

  // 유저 테이블에 정보를 저장합니다.
  await getRepository(User).insert({ email, nickname, pw: encryptedPw, emailToken, pwToken });

  // 인증이메일을 발송합니다.
  await sendAuthEmail(email, emailToken);

  /*
   * 클라이언트에 엑세스토큰를 쿠키로 보냅니다. (만료기한 7일)
   * 클라이언트에게 새로 생성된 유저정보를 보내 줍니다.
   */
  logger.info('회원가입 되었습니다.');
  return res.status(201).json({ ok: true, message: '회원가입 되었습니다.' });
};

export const verifyUser = async (req: Request, res: Response): Promise<any> => {
  const emailToken = req.query.emailToken as string;

  const user = await getRepository(User).findOne({ emailToken });
  if (!user) {
    logger.warn('존재하지 않는 이메일로 인증을 시도하고 있습니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }

  //  auth 테이블에 emailToken과 isVerified 정보를 수정해서 이메일 인증을 완료합니다.
  // 로그인이 가능한 계정입니다.
  const decryptedEmailToken = await bcrypt.compare(user?.email!, emailToken);
  if (decryptedEmailToken) {
    user!.emailToken = null;
    user!.isVerified = true;
    await getRepository(User).save(user!);
  }

  // 로그인을 위해 클라이언트의 홈페이지로 리다이렉트 합니다.
  logger.info('이메일 인증확인 성공하였습니다.');
  return res.status(200).redirect(process.env.CLIENT_ADDR as string);
};

export const forgotPw = async (req: Request<{}, {}, ForgotPwDTO>, res: Response): Promise<any> => {
  const userRepo = getCustomRepository(UserRepository);

  const { email } = req.body;

  // 요청받은 email로 유저의 pwToken을 찾습니다.
  // pw칼럼은 select: false 처리가 되어있기 때문에 쿼리빌더 addSelect를 이용해서 불러온다.
  const user = await userRepo.findWithPwTokenByEmail(email);
  if (!user) {
    logger.warn('존재하지 않는 이메일로 비밀번호 찾기를 시도하고 있습니다.');
    throw ApiError.BadRequest('이메일이 존재하지 않습니다.');
  }

  // 유저가 존재한다면 비밀번호 찾기 인증 메일을 발송합니다.
  // 비밀번호 인증을 위해 auth테이블에 pwToken이 필요합니다.
  await sendEmailForResetPw(email, user.pwToken!);

  return res.status(200).json({ ok: true, message: '인증 이메일을 발송하였습니다.' });
};

export const resetPw = async (req: Request<{}, {}, ResetPwDTO>, res: Response): Promise<any> => {
  const { updatedPw } = req.body;
  const pwToken = req.query.pwToken as string;

  const user = await getRepository(User).findOne({ pwToken });
  if (!user) {
    logger.warn('잘못된 비밀번호 토큰으로 유저찾기를 시도하고 있습니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }

  // 클라이언트에서 받아온 비밀번호를 헤싱하여 데이터베이스에 저장 합니다.
  // 보안을 위해 pwToken을 새롭게 발급하고 데이터베이스에 저장합니다.
  const encryptedPw = await bcrypt.hash(updatedPw, 8);
  const newPwToken = await bcrypt.hash(user?.nickname, 8);

  // 새로운 비밀번호 토큰과 비밀번호를 업데이트 합니다.
  await getRepository(User).update(user.id, { pw: encryptedPw, pwToken: newPwToken });

  logger.info('비밀번호가 재설정 되었습니다.');
  return res.status(200).json({ ok: true, message: '비밀번호가 재설정 되었습니다.' });
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const userId = Number(req.params.userId);

  const user = await getRepository(User).findOne({ id: userId });
  if (!user) {
    logger.warn('존재하지 않는 유저가 유저정보를 가져오려고 시도합니다.');
    throw ApiError.NotFound('존재하지 않는 유저입니다.');
  }

  logger.info('유저정보를 가져왔습니다.');
  return res.status(200).json({ ok: true, message: '유저정보를 가져왔습니다.', user });
};

export const verifyEmail = async (req: Request<{}, {}, VerifyEmailDTO>, res: Response): Promise<any> => {
  const id = req.session.user?.id!;
  const { updatedEmail } = req.body;

  const isExistingUser = await getRepository(User).count({ id });
  if (isExistingUser) {
    logger.warn('존재하지 않은 유저가 이메일 변경을 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }
  const isExistingEmail = await getRepository(User).count({ email: updatedEmail });
  if (isExistingEmail) {
    logger.warn('이미 존재하는 이메일로 이메일 변경을 시도하고 있습니다.');
    throw ApiError.Conflict('이미 존재하는 이메일 입니다.');
  }

  await sendEmailForUpdateEmail(id, updatedEmail);

  logger.info('이메일 변경 인증 메세지를 보냈습니다.');
  return res.status(200).json({ ok: true, message: '이메일 변경을 위한 인증 메세지를 보냈습니다.' });
};

export const updateEmail = async (req: Request, res: Response): Promise<any> => {
  const userId = Number(req.params.userId);
  const updatedEmail = req.query.updatedEmail as string;

  // 이메일을 변경해줍니다.
  await getRepository(User).update(userId, { email: updatedEmail });

  logger.info(`${userId}님 이메일 변경 완료되었습니다.`);
  return res.status(200).redirect(process.env.CLIENT_ADDR as string);
};

export const updateNickname = async (req: Request<{}, {}, UpdateNicknameDTO>, res: Response): Promise<any> => {
  const id = req.session.user?.id!;
  const { updatedNickname } = req.body;

  const user = await getRepository(User).findOne({ id });
  if (!user) {
    logger.warn('존재하지 않은 유저가 닉네임 변경을 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }
  const isExistingNickname = await getRepository(User).findOne({ nickname: updatedNickname });
  if (isExistingNickname) {
    logger.warn('이미 존재하는 닉네임으로 닉네임 변경을 시도하고 있습니다.');
    throw ApiError.Conflict('이미 존재하는 닉네임 입니다.');
  }

  // 닉네임을 변경해줍니다.
  await getRepository(User).update(id, { nickname: updatedNickname });

  logger.info(`${id}님의 닉네임 변경이 완료되었습니다.`);
  return res.status(200).json({ ok: true, message: '닉네임 변경 완료되었습니다.', updatedNickname });
};

export const updatePw = async (req: Request<{}, {}, UpdatePwDTO>, res: Response): Promise<any> => {
  const userRepo = getCustomRepository(UserRepository);

  const id = req.session.user?.id!;
  const { currentPw, updatedPw } = req.body;

  // select: false 처리된 pw를 가져오기위해 쿼리빌더를 addSelect를 사용한다.
  const user = await userRepo.findWithPwById(id);
  if (!user) {
    logger.warn('존재하지 않은 유저가 닉네임 변경을 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }

  const decryptedPw = await bcrypt.compare(currentPw, user?.pw!);
  if (!decryptedPw) {
    logger.warn('일치하지 않는 비밀번호로 비밀번호 변경을 시도하고 있습니다.');
    throw ApiError.BadRequest('입력하신 현재 비밀번호가 유효하지 않습니다.');
  }

  // 새로운 비밀번호를 암호화 해준뒤, 비밀번호를 변경 해줍니다.
  const encryptedPw = await bcrypt.hash(updatedPw, 8);
  await getRepository(User).update(Number(id), { pw: encryptedPw });

  logger.info(`${id}님의 비밀번호 변경이 완료되었습니다.`);
  return res.status(200).json({ ok: true, message: '비밀번호 변경 완료되었습니다.\n 다시 로그인 해주세요.' });
};

export const updateDesc = async (req: Request<{}, {}, UpdateDescDTO>, res: Response): Promise<any> => {
  const id = req.session.user?.id!;
  const { updatedDesc } = req.body;

  const isExistingUser = await getRepository(User).count({ id });
  if (!isExistingUser) {
    logger.warn('존재하지 않은 유저가 자기소개 변경을 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }

  // 자기소개를 변경해줍니다.
  await getRepository(User).update(id, { desc: updatedDesc });

  logger.info(`${id}님의 자기소개 변경이 완료되었습니다.`);
  return res.status(200).json({ ok: true, message: '자기소개 변경 완료되었습니다.', updatedDesc });
};

export const updateAvatar = async (req: Request, res: Response): Promise<any> => {
  const id = req.session.user?.id!;
  const updatedAvatar = (req.file as Express.MulterS3.File).location;
  const updatedAvatarKey = (req.file as Express.MulterS3.File).key;

  // s3 helper가 오류가 났을경우
  if (!updatedAvatar || !updatedAvatarKey) {
    logger.error('s3에서 변경할 프로필 이미지를 받아오지 못했습니다.');
    throw ApiError.InternalServerError('내부적인 문제로 프로필 변경을 실패하였습니다.');
  }

  const user = await getRepository(User).findOne({ id });
  if (!user) {
    logger.warn('존재하지 않은 유저가 프로필사진 변경을 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }
  const currentAvatarKey = user?.avatarKey;
  const defaultAvatarKey = process.env.DEFAULT_AVATAR_KEY as string;

  // 기존의 아바타가 기본 아바타가 아니라면 s3최적화를 위해 삭제한다.
  if (currentAvatarKey !== defaultAvatarKey) s3Delete(currentAvatarKey);

  await getRepository(User).update(id, { avatar: updatedAvatar, avatarKey: updatedAvatarKey });

  logger.info(`${id}님의 프로필이미지 변경 완료되었습니다.`);
  return res.status(200).json({
    ok: true,
    message: '프로필이미지 변경 완료되었습니다.',
    updatedAvatar,
    updatedAvatarKey,
  });
};

export const updateDefaultAvatar = async (req: Request, res: Response): Promise<any> => {
  const id = req.session.user?.id!;

  const user = await getRepository(User).findOne({ id });
  if (!user) {
    logger.warn('존재하지 않은 유저가 프로필사진 변경을 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }

  const currentAvatarKey = user?.avatarKey;

  // 기본 프로필 사진 데이터입니다.
  const defaultAvatar = process.env.DEFAULT_AVATAR_URL as string;
  const defaultAvatarKey = process.env.DEFAULT_AVATAR_KEY as string;

  // 기존의 아바타가 기본 아바타가 아니라면 s3최적화를 위해 삭제한다.
  if (currentAvatarKey !== defaultAvatarKey) s3Delete(currentAvatarKey);

  // 기본 아바타, 아바타키로 업데이트한다.
  await getRepository(User).update(id, { avatar: defaultAvatar, avatarKey: defaultAvatarKey });

  logger.info(`${id}님의 기본이미지로 변경 완료되었습니다.`);
  return res.status(200).json({
    ok: true,
    message: '기본이미지로 변경 완료되었습니다.',
    updatedAvatar: defaultAvatar,
    updatedAvatarKey: defaultAvatarKey,
  });
};

export const updateCover = async (req: Request, res: Response): Promise<any> => {
  const id = req.session.user?.id!;
  const updatedCover = (req.file as Express.MulterS3.File).location;
  const updatedCoverKey = (req.file as Express.MulterS3.File).key;

  // s3 helper가 오류가 났을경우
  if (!updatedCover || !updatedCoverKey) {
    logger.error('s3에서 변경할 커버 이미지를 받아오지 못했습니다.');
    throw ApiError.InternalServerError('내부적인 문제로 커버 변경을 실패하였습니다.');
  }

  const user = await getRepository(User).findOne({ id: Number(id) });
  if (!user) {
    logger.warn('존재하지 않은 유저가 프로필사진 변경을 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }
  const currentCoverKey = user?.coverKey;
  const defaultCoverKey = process.env.DEFAULT_Cover_KEY as string;

  // 기존의 아바타가 기본 아바타가 아니라면 s3최적화를 위해 삭제한다.
  if (currentCoverKey !== defaultCoverKey) s3Delete(currentCoverKey);

  // 새로운 커버이미지, 커버이미지키로 업데이트한다.
  await getRepository(User).update(id, { cover: updatedCover, coverKey: updatedCoverKey });

  logger.info(`${id}님의 커버이미지 변경 완료되었습니다.`);
  return res.status(200).json({
    ok: true,
    message: '커버이미지 변경 완료되었습니다.',
    updatedCover,
    updatedCoverKey,
  });
};

export const updateDefaultCover = async (req: Request, res: Response): Promise<any> => {
  const id = req.session.user?.id!;

  const user = await getRepository(User).findOne({ id });
  if (!user) {
    logger.warn('존재하지 않은 유저가 프로필사진 변경을 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }

  const currentCoverKey = user?.coverKey;

  // 기본 프로필 사진 데이터입니다.
  const defaultCover = process.env.DEFAULT_Cover_URL as string;
  const defaultCoverKey = process.env.DEFAULT_Cover_KEY as string;

  // 기존의 아바타가 기본 아바타가 아니라면 s3최적화를 위해 삭제한다.
  if (currentCoverKey !== defaultCoverKey) s3Delete(currentCoverKey);

  // 기본 커버 이미지 , 키로 업데이트한다.
  await getRepository(User).update(id, { cover: defaultCover, coverKey: defaultCoverKey });

  logger.info(`${id}님의 기본 커버이미지로 변경 완료되었습니다.`);
  return res.status(200).json({
    ok: true,
    message: '기본 커버이미지로 변경 완료되었습니다.',
    updatedCover: defaultCover,
    updatedCoverKey: defaultCoverKey,
  });
};

export const sendReport = async (
  req: Request<SendReportDTO['params'], {}, SendReportDTO['body']>,
  res: Response
): Promise<any> => {
  const id = req.session.user?.id;
  const suspectId = Number(req.params.userId); // 용의자 id
  const { reportType, report, url } = req.body;

  const isExistingUser = await getRepository(User).count({ id: suspectId });
  if (!isExistingUser) {
    logger.warn('존재하지 않는 유저를 신고하려고 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저를 신고할 수 없습니다.');
  }

  const webHookUrl = process.env.SLACK_WEBHOOK_URL as string;
  const webHook = new IncomingWebhook(webHookUrl);

  const result = await webHook.send({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `"${reportType}"신고 들어왔습니다. 🚨🚨`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*<http://localhost:3000${url}|확인하러가기>*`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `신고자ID: ${id}\n신고서: ${report}`,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `
                용의자ID: ${suspectId}
              `,
        },
      },
    ],
  });

  if (result.text !== 'ok') {
    logger.error('신고하기 실패하였습니다.');
    throw ApiError.InternalServerError('내부적인 문제로 신고하기 실패하였습니다.');
  }
  logger.info('신고하기 성공하였습니다.');
  return res.status(200).json({ ok: true, message: '신고 성공하였습니다.' });
};
export const getUserInfo = async (req: Request<GetUserInfoDTO>, res: Response): Promise<any> => {
  const userId = Number(req.params.userId);

  const user = await getRepository(User).findOne(userId);
  const drawingsNum = await getRepository(Drawing).count({ user_id: userId });
  const drawingCommentsNum = await getRepository(DrawingComment).count({ user_id: userId });
  const postsNum = await getRepository(Post).count({ user_id: userId });
  const postCommentsNum = await getRepository(Comment).count({ user_id: userId });

  const totalPostsNum = postsNum;
  const totalCommentsNum = drawingCommentsNum + postCommentsNum;

  logger.info('유저정보 가져오기 성공하였습니다.');
  return res.status(200).json({
    ok: true,
    message: '유저정보 가져오기 성공하였습니다.',
    user,
    drawingsNum, // 이 유저가 프로필에 업로드한 사진 갯수
    totalPostsNum, // 이 유저가 올린 모든 게시판에 걸쳐 올린 게시글 수
    totalCommentsNum, // 이 유저가 작성한 모든 댓글 갯수
  });
};

export const givePenalty = async (
  req: Request<GivePenaltyDTO['params'], {}, GivePenaltyDTO['body']>,
  res: Response
): Promise<any> => {
  const userId = Number(req.params.userId);
  const { penaltyPeriod } = req.body;

  const user = await getRepository(User).findOne({ id: userId });
  if (user?.isPenalty) {
    logger.warn(`불량유저에게 다시 제재조치를 하려고 시도합니다.`);
    throw ApiError.BadRequest('아직 제재기간이 남아있습니다.');
  }

  // 제재조치기간 후에 다시 user테이블의 isPenalty칼럼이 false가 되면서 제재가 풀리게 된다.
  const expiredDate = moment().add(penaltyPeriod, 'minutes').toDate();

  // Penalty테이블에 제재유저의 정보를 저장한다.
  const newPenalty = new Penalty();
  newPenalty.userId = userId;
  newPenalty.expired_at = expiredDate;
  await getRepository(Penalty).save(newPenalty);

  // user테이블의 isPenalty칼럼을 true로 변경한다.
  await getRepository(User).update(userId, { isPenalty: true });
  req.session.user!.isPenalty = true;
  req.session.save(() => {
    logger.info(`id:${userId}님에게 관리자 권한으로 유저에게 패널티를 주었습니다.`);
    return res.status(200).json({ ok: true, message: '관리자 권한으로 불량유저가 되었습니다.' });
  });
};

export const deleteAccount = async (req: Request, res: Response): Promise<any> => {
  const id = req.session.user?.id!;

  const user = await getRepository(User).findOne({ id });
  if (!user) {
    logger.warn('존재하지 않은 유저가 계정삭제를 시도합니다.');
    throw ApiError.BadRequest('존재하지 않는 유저입니다.');
  }
  const drawings = await getRepository(Drawing).find({ user_id: id });
  const imageKeys = await getRepository(ImageKey).find({ user_id: id });

  const currentAvatarKey = user?.avatarKey;
  const currentCoverKey = user?.coverKey;
  const defaultAvatarKey = process.env.DEFAULT_AVATAR_KEY as string;
  const defaultCoverKey = process.env.DEFAULT_COVER_KEY as string;

  // 기본이미지 제외, 탈퇴한 계정의 프로필 사진을 s3에서 객체삭제 합니다.
  if (currentAvatarKey !== defaultAvatarKey) s3Delete(currentAvatarKey as string);
  // 기본커버 제외, 탈퇴한 계정의 커버 사진을 s3에서 객체삭제 합니다.
  if (currentCoverKey !== defaultCoverKey) s3Delete(currentCoverKey as string);
  // s3에 저장된 유저가 올린 모든 그림을 삭제합니다.
  drawings.forEach(async (drawing) => s3Delete(drawing.key as string));
  // s3에 저장된 유저가 올린 모든 게시물(post) 이미지를 삭제합니다.
  imageKeys.forEach(async (imageKey) => s3Delete(imageKey.key as string));

  await getRepository(User).delete({ id });

  // 레디스에 저장된 대화정보 등등 식제
  await cluster.del(`chats:${user?.chatId}`);
  await cluster.del(`messages:${user?.chatId}`);
  await cluster.del(`messageNotis:${user?.chatId}`);

  // 세션 제거
  req.session.destroy((err: any) => {
    if (err) {
      logger.error('로그아웃시 세션제거 과정 중 에러 발생');
      throw ApiError.InternalServerError('내부적인 문제로 로그아웃 실패하였습니다.');
    }
  });

  logger.info(`${id}님 계정 삭제 성공 하였습니다.`);
  return res.status(200).clearCookie('sid').json({ ok: true, message: '계정이 정상적으로 삭제되었습니다.' });
};
