import { Request, Response } from 'express';
import { IncomingWebhook } from '@slack/webhook';
import logger from '@src/helpers/winston.helper';
import { getCustomRepository } from 'typeorm';
import { ImageKeyRepository, PostCommentRepository, PostRepository } from '@src/repositorys/board.repository';
import { DrawingCommentRepository, DrawingRepository } from '@src/repositorys/drawing.repository';
import { UserRepository } from '@src/repositorys/user.repository';
import { s3Delete } from '@src/utils/s3.utils';
import cluster from '@src/helpers/redis.helper';

const etcController = {
  sendReport: async (req: Request, res: Response) => {
    try {
      const { reportType, report, url, suspectId } = req.body;
      const id = req.session.user?.id;

      if (reportType === '') {
        logger.info('신고유형을 선택하세요.');
        return res.status(400).json({ ok: false, message: '신고유형을 선택하세요.' });
      } else if (report.length === 0) {
        logger.info('신고내용을 입력해주세요.');
        return res.status(400).json({ ok: false, message: '신고내용을 입력해주세요.' });
      } else if (report.length > 100) {
        logger.info('신고내용 글자수를 초과하였습니다.');
        return res.status(400).json({ ok: false, message: '신고내용 글자수를 초과하였습니다.' });
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
        logger.warn('신고하기 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '신고하기 실패하였습니다.' });
      }
      logger.info('신고하기 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '신고 성공하였습니다.' });
    } catch (err: any) {
      logger.error('신고하기 에러', err);
      console.log(err);

      return res.status(500).json({ ok: false, message: '신고하기 에러' });
    }
  },
  getUserInfo: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    const drawingRepo = getCustomRepository(DrawingRepository);
    const drawingCommentRepo = getCustomRepository(DrawingCommentRepository);
    const postRepo = getCustomRepository(PostRepository);
    const postCommentRepo = getCustomRepository(PostCommentRepository);

    try {
      const { userId } = req.body;

      const userInfo = await userRepo.findUserById(Number(userId));
      const drawingsNum = await drawingRepo.getDrawingsNum(Number(userId));
      const drawingCommentsNum = await drawingCommentRepo.getDrawingCommentsNum(Number(userId));
      const postsNum = await postRepo.getPostsNum(Number(userId));
      const postCommentsNum = await postCommentRepo.getPostCommentsNum(Number(userId));

      logger.info('유저정보 가져오기 성공하였습니다.');
      return res.status(200).json({
        ok: true,
        message: '유저정보 가져오기 성공하였습니다.',
        userInfo,
        drawingsNum: Number(drawingsNum.count),
        drawingCommentsNum: Number(drawingCommentsNum.count),
        postsNum: Number(postsNum.count),
        postCommentsNum: Number(postCommentsNum.count),
      });
    } catch (err: any) {
      logger.error('유저정보 가져오기 에러', err);
      return res.status(500).json({ ok: false, message: '유저정보 가져오기 에러' });
    }
  },
  calcExp: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      const { userId, value } = req.body;
      const id = req.session.user?.id;

      if (!userId) {
        const result = await userRepo.calcExp(id as number, value);
        if (result.affected === 0) {
          logger.info('영감력 계산 실패하였습니다.');
          return res.status(400).json({ ok: false, message: '영감력 계산 실패하였습니다.' });
        }
      } else {
        const result = await userRepo.calcExp(Number(userId), value);
        if (result.affected === 0) {
          logger.info('영감력 계산 실패하였습니다.');
          return res.status(400).json({ ok: false, message: '영감력 계산 실패하였습니다.' });
        }
      }

      logger.info('영감력 계산 성공하였습니다.');
      return res.status(200).json({ ok: true, message: '영감력 계산 성공하였습니다.', calcedValue: value });
    } catch (err: any) {
      logger.error('영감력 계산 에러', err);
      return res.status(500).json({ ok: false, message: '영감력 계산 에러' });
    }
  },
  delAccountByAdmin: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    const drawingRepo = getCustomRepository(DrawingRepository);
    const imageKeysRepo = getCustomRepository(ImageKeyRepository);
    try {
      const { userId } = req.params;

      const user = await userRepo.findUserById(Number(userId));
      const drawings = await drawingRepo.findDrawingById(Number(userId));
      const imageKeys = await imageKeysRepo.findImageKeysById(Number(userId));

      const currentAvatarKey = user?.avatarKey;
      const currentCoverKey = user?.coverKey;

      const defaultAvatarKey = process.env.DEFAULT_AVATAR_KEY as string;
      const defaultCoverKey = process.env.DEFAULT_COVER_KEY as string;

      // 기본이미지 제외, 탈퇴한 계정의 프로필 사진을 s3에서 객체삭제 합니다.
      if (currentAvatarKey !== defaultAvatarKey) s3Delete(req, res, currentAvatarKey as string);

      // 기본커버 제외, 탈퇴한 계정의 커버 사진을 s3에서 객체삭제 합니다.
      if (currentCoverKey !== defaultCoverKey) s3Delete(req, res, currentCoverKey as string);

      // s3에 저장된 유저가 올린 모든 그림을 삭제합니다.
      drawings.forEach(async (drawing) => s3Delete(req, res, drawing.key as string));

      // s3에 저장된 유저가 올린 모든 게시물(post) 이미지를 삭제합니다.
      imageKeys.forEach(async (imageKey) => s3Delete(req, res, imageKey.image_key as string));

      // onDelete: cascade 때문에 관계된 모든 유저정보를 삭제합니다.
      const result = await userRepo.deleteUser(Number(userId));

      if (result.affected === 0) {
        logger.warn('관리자 권한으로 인한 계정 삭제 실패하였습니다.');
        return res.status(400).json({ ok: false, message: '관리자 권한으로 인한 계정 삭제 실패하였습니다.' });
      }

      // 레디스에 저장된 대화정보 등등 식제
      await cluster.del(`chats:${user?.chatId}`);
      await cluster.del(`messages:${user?.chatId}`);
      await cluster.del(`msgNotis:${user?.chatId}`);

      logger.info('관리자 권한으로 계정 삭제 성공 하였습니다.');
      return res.status(200).json({ ok: true, message: '관리자 권한으로 계정이 정상적으로 삭제되었습니다.' });
    } catch (err: any) {
      logger.error('관리자 권한으로 인한 계정삭제 에러', err);
      return res.status(500).json({ ok: false, message: '관리자 권한으로 인한 계정삭제 에러' });
    }
  },
};

export default etcController;
