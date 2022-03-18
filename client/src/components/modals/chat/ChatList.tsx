import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import styled from 'styled-components';
import socket from '@src/utils/socket';
import 'moment/locale/ko';
import relativeTime from '@src/utils/date.util';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectChats, isChatUser, selectMsgNotis } from '@src/redux/slices/chat.slice';
import { ChatUserType } from '@src/redux/types/chat.type';

function ChatList() {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectChats);
  const msgNotis = useAppSelector(selectMsgNotis);

  useEffect(() => {
    socket.emit('updateLastMessage');
  }, []);

  const onAddChatUser = (chat: ChatUserType) => async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(isChatUser({ chatUser: chat }));
    localStorage.setItem('chatUser', JSON.stringify(chat));
  };

  return (
    <Container>
      <ul>
        {chats.length === 0 ? (
          <p>대화상대가 존재하지 않습니다...</p>
        ) : (
          chats.map((chat) => {
            const msgNotiNum = msgNotis.filter((msgNoti) => msgNoti.from === chat.userId).length;

            return (
              <li key={v4()} onClick={onAddChatUser(chat)}>
                {msgNotiNum === 0 ? null : (
                  <div className="noti">
                    <span className="noti-number">{msgNotiNum}</span>
                  </div>
                )}
                <div className="wrapper">
                  <div className="avatar">
                    <img src={`${chat.avatar}`} alt="프사" />
                  </div>
                  <div className="info">
                    <span className="nickname">{chat.nickname}</span>
                    <span className="lastMessage">{chat.lastType === 'image' ? '이미지' : chat.lastMessage}</span>
                  </div>
                </div>
                <span className="lastDate">{relativeTime(chat.lastDate!)}</span>
              </li>
            );
          })
        )}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  p {
    font-size: 1.5rem;
    text-align: center;
    margin-top: 5rem;
  }
  li {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    cursor: pointer;
    border-radius: 5px;
    text-overflow: ellipsis;
    &:hover {
      background-color: ${({ theme }) => theme.palette.gray};
    }
  }

  .noti {
    background-color: red;
    border-radius: 100%;
    position: absolute;
    padding: 0.3rem;
    top: 3.5rem;
    left: 4rem;
  }

  .noti-number {
    color: white;
  }

  .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.palette.black};
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .wrapper {
    display: flex;
    gap: 1rem;
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 18rem;

    .nickname {
      font-size: 1.5rem;
      font-weight: 500;
    }
    .lastMessage {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1.2rem;
    }
  }
`;
export default ChatList;
