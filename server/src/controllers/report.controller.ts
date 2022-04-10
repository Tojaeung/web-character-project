import { Request, Response } from 'express';
import { IncomingWebhook } from '@slack/webhook';
import logger from '@src/helpers/winston.helper';

const reportController = {
  sendReport: async (req: Request, res: Response) => {
    try {
      const { reportType, content, url, id, nickname } = req.body;

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
              text: `신고자 아이디: ${id}\n신고자 닉네임: ${nickname}\n신고내용: ${content} `,
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
};

export default reportController;
