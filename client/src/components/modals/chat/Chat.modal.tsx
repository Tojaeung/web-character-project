import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { ImExit } from 'react-icons/im';
import ChatList from './ChatList';
import ChatFooter from './ChatFooter';
import ChatBody from './ChatBody';
import { isChatUser, selectChatUser, selectChatOk, closeChatModal } from '@src/redux/slices/chat.slice';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { openModal } from '@src/redux/slices/modal.slice';

function ChatModal() {
  const dispatch = useAppDispatch();
  const chatOk = useAppSelector(selectChatOk);
  const chatUser = useAppSelector(selectChatUser);

  useEffect(() => {
    const chatObj = JSON.parse(localStorage.getItem('chatUser') as string);
    if (!chatObj) return;
    dispatch(isChatUser({ chatUser: chatObj }));
  }, []);

  // 대화창에서 대화목록으로 뒤로가기 됩니다.
  const onBack = async (e: React.MouseEvent<SVGElement>) => {
    dispatch(isChatUser({ chatUser: undefined }));
    localStorage.removeItem('chatUser');
  };

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
      {!chatUser ? (
        <div className="header">
          <span>대화상대</span>
          <AiOutlineClose className="close-icon" onClick={onClose} />
        </div>
      ) : (
        <div className="chatUser">
          <div>
            <IoIosArrowBack className="back-icon" onClick={onBack} />
            <div className="avatar">
              <img src={`${chatUser.avatar}`} alt="프사" />
            </div>
            <span>{chatUser.nickname}</span>
          </div>
          <div>
            <ImExit className="exitChat-icon" onClick={onExitChat} />
            <AiOutlineClose className="close-icon" onClick={onClose} />
          </div>
        </div>
      )}

      {!chatUser ? (
        <div className="list">
          <ChatList />
        </div>
      ) : (
        <>
          <div className="window">
            <ChatBody />
          </div>
          <div className="footer">
            <ChatFooter />
          </div>
        </>
      )}
    </Container>,
    document.getElementById('portal') as HTMLElement
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 1rem;
  width: 32rem;
  height: 70rem;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 999;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
    padding: 1rem;
    background-color: ${({ theme }) => theme.palette.white};
    span {
      font-size: 1.5rem;
      font-weight: 500;
    }
    .close-icon {
      font-size: 2rem;
      cursor: pointer;
    }
  }
  .list {
    height: 60rem;
    overflow-y: scroll;
  }
  .window {
    height: 60rem;
    overflow-y: scroll;
  }
  .footer {
    background-color: ${({ theme }) => theme.palette.white};
    width: 32rem;
    position: fixed;
    bottom: 0;
    border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
    padding-bottom: 0.5rem;
  }
  .chatUser {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
    padding: 1rem;

    div {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    .avatar {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid ${({ theme }) => theme.palette.black};
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    span {
      font-size: 1.5rem;
      font-weight: 500;
    }
    .back-icon {
      font-size: 2rem;
      cursor: pointer;
    }
    .exitChat-icon {
      font-size: 2rem;
      cursor: pointer;
    }
    .close-icon {
      font-size: 2rem;
      cursor: pointer;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    bottom: 4.5rem;
    right: 0;
    height: 50rem;

    .list {
      height: 40rem;
    }
    .window {
      height: 40rem;
    }
    .footer {
      bottom: 5rem;
    }
  }
`;

export default ChatModal;
