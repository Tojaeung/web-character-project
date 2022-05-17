import { getCustomRepository, getRepository } from 'typeorm';
import moment from 'moment';
import schedule from 'node-schedule';
import { SessionSocket } from '@src/types/index';
import { NotificationRepository } from '@src/repositorys/notification.repository';
import User from '@src/entities/user/user.entity';

interface PenaltyNotiType {
  type: 'penalty';
  userId: number; // 알림을 받는 유저 id
  penaltyPeriod: string; // 관리자가 보내는 알림내용
}

const addPenaltyNoti = async (socket: SessionSocket, penaltyNotiObj: PenaltyNotiType) => {
  const notificationRepo = getCustomRepository(NotificationRepository);

  const { type, userId, penaltyPeriod } = penaltyNotiObj;

  const content = `${penaltyPeriod}일간 제재조치 되었습니다.\n 제재 만료일: ${moment()
    .add(penaltyPeriod, 'minutes')
    .format('YYYY-MM-DD HH:mm:ss')}`;

  const user = await getRepository(User).findOne({ id: userId });

  const newNotification = await notificationRepo.create(type, content as string, userId);

  const result = { ok: true, message: '유저에게 제재조치 알림을 보냈습니다.', newNotification };

  socket.to(user?.chatId as string).emit('addNotification', result);

  // 제재조치 기간후, 제재조치가 풀릴때 실행되는 함수이다.
  // 제재조치를 당한 유저에게 제재가 해제 되었다는 알림을 보낸다.
  const expiredData = moment().add(Number(penaltyPeriod), 'minutes').format();
  schedule.scheduleJob(expiredData, async () => {
    const content = `제재조치가 해제되었습니다. 서비스를 정상적으로 사용할 수 있습니다. `;

    const newNotification = await notificationRepo.create(type, content as string, userId);

    const result = { ok: true, message: '유저에게 제재조치가 해제되었음을 알리는 알림을 보냈습니다.', newNotification };

    socket.to(user?.chatId as string).emit('addNotification', result);
  });
};

export default addPenaltyNoti;
