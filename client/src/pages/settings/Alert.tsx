import { useEffect } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@src/store/app/hook';
import { selectNotificationNotifications } from '@src/store/slices/notification.slice';
import CreatedTime from '@src/components/CreatedTime';
import TabMenu from './common/TabMenu';
import socket from '@src/utils/socket';
import notificationType from '@src/utils/notificationType.util';

function Alert() {
  const notifications = useAppSelector(selectNotificationNotifications);

  useEffect(() => {
    socket.emit('getNotification');
  }, []);

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
              <tr key={v4()}>
                <td>{notificationType(notification.type)}</td>
                <td className="content">{notification.content}</td>
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
    width: 60%;
    word-break: break-all;
  }
`;

const PostLink = styled(Link)``;

export default Alert;
