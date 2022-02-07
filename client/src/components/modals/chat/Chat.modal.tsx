import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as S from './Chat.modal.styled';
import { AiOutlineClose } from 'react-icons/ai';
import ChatList from './ChatList';
import ChatFooter from './ChatFooter';
import ChatBody from './ChatBody';
// import socket from '@src/utils/socket';

interface IProps {
  openChat: boolean;
  setOpenChat: (e: any) => void;
}

interface ChatType {
  id: string;
  nickname: string;
  avatar: string;
}

function ChatModal({ openChat, setOpenChat }: IProps) {
  const [chat, setChat] = useState<ChatType | null | undefined>(undefined);
  useEffect(() => {
    const chatObj = JSON.parse(localStorage.getItem('chatUser') as string);
    setChat(chatObj);
  }, []);

  const onClose = (e: React.MouseEvent<SVGElement>) => {
    localStorage.removeItem('chat');
    setOpenChat(false);
    // socket.disconnect();
  };

  if (!openChat) return null;
  return createPortal(
    <S.Container>
      <S.ListWrapper>
        <ChatList setChat={setChat} />
      </S.ListWrapper>

      <S.WindowWrapper>
        <S.Header>
          <span>{chat ? `${chat.nickname}님과 대화 중...💬` : '왼쪽 대화 상대를 클릭하세요!!📢'}</span>
          <AiOutlineClose className="closeIcon" onClick={onClose} />
        </S.Header>

        <S.Body>
          <ChatBody chat={chat} />
        </S.Body>

        <S.Footer>
          <ChatFooter chat={chat} />
        </S.Footer>
      </S.WindowWrapper>
    </S.Container>,
    document.getElementById('portal') as HTMLElement
  );
}

export default ChatModal;
