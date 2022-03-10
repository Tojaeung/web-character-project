import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import ChatList from './ChatList';
import ChatFooter from './ChatFooter';
import ChatBody from './ChatBody';
import { isChatUser, selectChats, selectChatUser, selectChatOk, closeChatModal } from '@src/redux/slices/chat.slice';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { openModal } from '@src/redux/slices/modal.slice';

function ChatModal() {
  const dispatch = useAppDispatch();
  const chatOk = useAppSelector(selectChatOk);
  const chatUser = useAppSelector(selectChatUser);
  const chats = useAppSelector(selectChats);

  useEffect(() => {
    const chatObj = JSON.parse(localStorage.getItem('chatUser') as string);
    if (!chatObj) return;
    dispatch(isChatUser({ chatUser: chatObj }));
  }, []);

  const onExitChat = async (e: React.MouseEvent<SVGElement>) => {
    if (!chatUser) return alert('나가고 싶은 채팅방을 선택해주세요.');
    await dispatch(openModal({ mode: 'exitChat' }));
  };

  const onClose = async (e: React.MouseEvent<SVGElement>) => {
    localStorage.removeItem('chat');
    await dispatch(closeChatModal());
  };

  if (!chatOk) return null;
  return createPortal(
    <Container>
      <div className="list">
        <ChatList />
      </div>
      <div className="window">
        <div className="header">
          <span>
            {chats.length === 0 && !chatUser && '채팅상대를 추가해주세요!! 🔍'}
            {chats.length > 0 && !chatUser && '왼쪽 채팅상대를 클릭하세요!! 📢'}
            {chats.length > 0 && chatUser && `${chatUser.nickname}님과 채팅 중...💬`}
          </span>
          <div>
            <ImExit className="exitChat-icon" onClick={onExitChat} />
            <AiOutlineClose className="closeIcon" onClick={onClose} />
          </div>
        </div>
        <div className="body">
          <ChatBody />
        </div>
        <div className="footer">
          <ChatFooter />
        </div>
      </div>
    </Container>,
    document.getElementById('portal') as HTMLElement
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 1rem;
  width: 50rem;
  height: 70vh;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.white};
  z-index: 1002;

  .list {
    width: 15rem;
    border-right: 1px solid ${({ theme }) => theme.palette.borderColor};
  }
  .window {
    display: flex;
    flex-direction: column;

    .header {
      width: 35rem;
      height: 5rem;
      border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      margin-bottom: 0.5rem;
      span {
        font-size: 1.5rem;
      }
      .exitChat-icon {
        font-size: 2.5rem;
        margin-right: 1rem;
        cursor: pointer;
      }
      .closeIcon {
        font-size: 2.5rem;
        cursor: pointer;
      }
    }
    .body {
      width: 100%;
      height: calc(100% - 10rem);
    }
    .footer {
      margin-bottom: 0.5rem;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 30rem;
  }
`;

export default ChatModal;
