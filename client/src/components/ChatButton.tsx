import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectChats, openChatModal } from '@src/store/slices/chat.slice';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import socket from '@src/utils/socket';

interface IProps {
  chatPartnerUserId: string;
}

function ChatButton({ chatPartnerUserId }: IProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const chats = useAppSelector(selectChats);

  const [isChatting, setIsChatting] = useState(false);

  useEffect(() => {
    if (chats.some((chat) => chat.userId === chatPartnerUserId)) {
      setIsChatting(true);
    } else {
      setIsChatting(false);
    }
  }, [chats, chatPartnerUserId]);

  // 채팅목록에 상대를 추가합니다.
  const handleAddChat = async (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!user) {
      return alert('로그인 후 이용 가능합니다.');
    } else {
      socket.emit('addChat', chatPartnerUserId);
      await dispatch(openChatModal());
      localStorage.setItem('chat', 'on');
    }
  };

  return (
    <Container>
      {!isChatting ? (
        <StartChat onClick={handleAddChat}>채팅하기</StartChat>
      ) : (
        <Chatting onClick={(e) => alert('이미 채팅중인')}>채팅중...</Chatting>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  font-size: 1.2rem;
  white-space: nowrap;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray};
  }
`;
const StartChat = styled.span`
  font-size: 1.2rem;
`;
const Chatting = styled.span`
  font-size: 1.2rem;
`;

export default ChatButton;
