import { useEffect } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/app/hook';
import { selectNotificationNotifications } from 'store/slices/notification.slice';
import CreatedTime from 'components/CreatedTime';
import TabMenu from './common/TabMenu';
import socket from 'utils/socket';
import { NotificationType } from 'interfaces/index';
import notificationType from 'utils/notificationType.util';
import { greenButtonStyle, inverseGreenButtonStyle } from 'styles/button.style';

function Notification() {
  const navigate = useNavigate();

  const notifications = useAppSelector(selectNotificationNotifications);

  useEffect(() => {
    socket.emit('getNotification');
  }, []);

  const handleReadAll = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!notifications.length) return alert('알림이 없습니다.');
    if (notifications.every((notification) => notification.is_confirmed)) {
      return alert('이미 모든 알림을 확인했습니다.');
    }
    await socket.emit('updateAllNotifications');
  };
  const handleDeleteAll = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!notifications.length) return alert('알림이 없습니다.');
    await socket.emit('deleteAllNotifications');
  };

  const handleUpdateNotification =
    (notification: NotificationType) => async (e: React.MouseEvent<HTMLParagraphElement>) => {
      if (!notification.is_confirmed) {
        const notificationId = notification.id;
        await socket.emit('updateNotification', notificationId);
        navigate(`/${notification.board}/${notification.postId}`);
      }
    };

  return (
    <Container>
      <TabMenu />
      <ButtonBox>
        <ReadAllButton onClick={handleReadAll}>모두읽음처리</ReadAllButton>
        <DeleteAllButton onClick={handleDeleteAll}>알림모두삭제</DeleteAllButton>
      </ButtonBox>
      <table>
        <thead>
          <tr>
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
              <tr key={v4()} className={notification.is_confirmed ? 'visited' : 'unVisited'}>
                <td className="content">
                  <p onClick={handleUpdateNotification(notification)}>
                    [ {[notificationType(notification.type)]} ] {notification.content}
                  </p>
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
  gap: 1rem;
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
  p {
    cursor: pointer;
  }
  .board-name {
    white-space: nowrap;
  }
  .content {
    text-align: left;
    width: 90%;
    word-break: break-all;
  }

  .visited {
    color: ${({ theme }) => theme.palette.gray};
  }
  .unVisited {
    color: ${({ theme }) => theme.palette.black};
  }
`;
const ButtonBox = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 1rem;
`;

const ReadAllButton = styled.button`
  ${inverseGreenButtonStyle};
  padding: 0.5rem;
  font-size: 1.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;

const DeleteAllButton = styled.button`
  ${greenButtonStyle};
  padding: 0.5rem;
  font-size: 1.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;

export default Notification;
