import { Request, Response } from 'express';
import { IncomingWebhook } from '@slack/webhook';
import logger from '@src/helpers/winston.helper';
import { getCustomRepository } from 'typeorm';
import { PostCommentRepository, PostRepository } from '@src/repositorys/board.repository';
import { DrawingCommentRepository, DrawingRepository } from '@src/repositorys/drawing.repository';
import { UserRepository } from '@src/repositorys/user.repository';

const reportController = {
  sendReport: async (req: Request, res: Response) => {
    try {
      const { reportType, report, url, proof } = req.body;
      const { nickname } = req.session.user!;

      const webHookUrl = process.env.SLACK_WEBHOOK_URL as string;
      const webHook = new IncomingWebhook(webHookUrl);

      const stringProof = JSON.stringify(proof, null, 2);

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
              text: `신고자: ${nickname}\n신고서: ${report}`,
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
                증거: ${stringProof}
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
};

export default reportController;
