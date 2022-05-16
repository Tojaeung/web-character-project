import { useEffect } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@src/store/app/hook';
import { selectNotificationNotifications } from '@src/store/slices/notification.slice';
import CreatedTime from '@src/components/CreatedTime';
import TabMenu from './common/TabMenu';
import socket from '@src/utils/socket';
import notificationType from '@src/utils/notificationType.util';
import { NotificationType } from '@src/types';

function Alert() {
  const navigate = useNavigate();

  const notifications = useAppSelector(selectNotificationNotifications);

  useEffect(() => {
    socket.emit('getNotification');
  }, []);

  const handlePenaltyNoti = (notificationId: number) => async (e: React.MouseEvent<HTMLParagraphElement>) => {
    await socket.emit('updateNotification', notificationId);
  };

  const handleNoPenaltyNoti = (notification: NotificationType) => async (e: React.MouseEvent<HTMLParagraphElement>) => {
    const notificationId = notification.id;
    await socket.emit('updateNotification', notificationId);
    navigate(`/${notification.boardName}/${notification.postId}`);
  };

  return (
    <Container>
      <TabMenu />
      <table>
        <thead>
          <tr>
            <th>유형</th>
            <th>내용</th>
            <th>시간</th>
          </tr>
        </thead>
        <tbody>
          {!notifications?.length ? (
            <tr>
              <td colSpan={3}>알림이 없습니다.</td>
            </tr>
          ) : (
            notifications.map((notification) => (
              <tr key={v4()} className={notification.isConfirmed ? 'visited' : 'unVisited'}>
                <td>{notificationType(notification.type)}</td>
                <td className="content">
                  {notification.type === 'penalty' ? (
                    <p onClick={handlePenaltyNoti(notification.id)}>{notification.content}</p>
                  ) : (
                    <p onClick={handleNoPenaltyNoti(notification)}>{notification.content}</p>
                  )}
                </td>
                <td>
                  <CreatedTime createdTime={notification.created_at} fontSize={1.2} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  table {
    width: 100%;
  }
  th {
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: ${({ theme }) => theme.palette.gray};
    border: 1px solid ${({ theme }) => theme.palette.black};
    white-space: nowrap;
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 1.3rem;
    }
  }

  td {
    text-align: center;
    font-size: 1.3rem;
    background-color: ${({ theme }) => theme.palette.white};
    border: 1px solid ${({ theme }) => theme.palette.gray};
    padding: 0.5rem;
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 1.2rem;
    }
  }

  .board-name {
    white-space: nowrap;
  }
  .content {
    text-align: left;
    width: 80%;
    word-break: break-all;
  }

  .visited {
    color: ${({ theme }) => theme.palette.gray};
  }
  .unVisited {
    color: ${({ theme }) => theme.palette.black};
  }
`;

export default Alert;
