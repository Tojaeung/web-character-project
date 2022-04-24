import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import moment from 'moment';
import schedule from 'node-schedule';
import { IncomingWebhook } from '@slack/webhook';
import logger from '@src/helpers/winston.helper';
import { PostCommentRepository, PostRepository } from '@src/repositorys/board.repository';
import { DrawingCommentRepository, DrawingRepository } from '@src/repositorys/drawing.repository';
import { UserRepository } from '@src/repositorys/user.repository';
import { User } from '@src/entities/user/user.entity';

const etcController = {
  sendReport: async (req: Request, res: Response) => {
    try {
      const { reportType, report, url, suspectId } = req.body;
      const id = req.session.user?.id;

      if (reportType === '') {
        logger.info('신고유형을 선택하세요.');
        return res.status(400).json({ ok: false, message: '신고유형을 선택하세요.' });
      } else if (!report.length) {
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

      const userInfo = await getRepository(User).findOne(userId);
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
  penaltyByAdmin: async (req: Request, res: Response) => {
    const userRepo = getCustomRepository(UserRepository);
    try {
      const { userId, penaltyPeriod } = req.body;

      // exp에 null 값을 주어서 패널티를 받고 있는 유저라는것을 나타낸다.
      const result = await userRepo.updateExp(Number(userId), null);
      if (result.affected === 0) {
        logger.info('관리자 권한으로 유저에게 패널티를 주지 못했습니다.');
        return res.status(400).json({ ok: false, message: '관리자 권한으로 유저에게 패널티를 주지 못했습니다.' });
      }

      // 1주일 후에 다시 exp가 0으로 돌아오면서 서비스를 이용할 수 있게된다.
      const date = moment().add(penaltyPeriod, 'days').format();
      schedule.scheduleJob(date, async () => {
        const result = await userRepo.updateExp(Number(userId), 0);
        if (result.affected === 0) {
          logger.info('유저의 패널티가 풀리지 못했습니다.');
          return res.status(400).json({ ok: false, message: '유저의 패널티가 풀리지 못했습니다.' });
        }
      });

      logger.info('관리자 권한으로 유저에게 패널티를 주었습니다.');
      return res.status(200).json({ ok: true, message: '관리자 권한으로 불량유저가 되었습니다.' });
    } catch (err: any) {
      logger.error('관리자 권한으로 계정 패널티 에러', err);
      return res.status(500).json({ ok: false, message: '관리자 권한으로 계정 패널티 에러' });
    }
  },
};

export default etcController;
