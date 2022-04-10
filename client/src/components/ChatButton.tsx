import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectChats, openChatModal } from '@src/store/slices/chat.slice';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import socket from '@src/utils/socket';

interface IProps {
  design: 'button' | 'list';
  chatPartnerUserId: string;
}

function ChatButton({ design, chatPartnerUserId }: IProps) {
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
  const onAddChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit('addChat', chatPartnerUserId);
    await dispatch(openChatModal());
    localStorage.setItem('chat', 'on');
  };

  return (
    <>
      {chatPartnerUserId === user?.userId ? null : (
        <Container>
          {!isChatting ? (
            <StartChatButton design={design} onClick={onAddChat}>
              채팅하기
            </StartChatButton>
          ) : (
            <ChattingButton design={design}>채팅중...</ChattingButton>
          )}
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  width: 100%;
`;
const StartChatButton = styled.button<{ design: 'button' | 'list' }>`
  border: 0;
  outline: 0;
  padding: 0.5rem;
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.palette.green};
  border-radius: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.white};
  cursor: pointer;
  ${({ design }) => {
    if (design === 'list') {
      return css`
        padding: 0;
        background-color: ${({ theme }) => theme.palette.bgColor};
        color: ${({ theme }) => theme.palette.black};
      `;
    }
  }}
`;
const ChattingButton = styled.button<{ design: 'button' | 'list' }>`
  border: 0;
  outline: 0;
  padding: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.red};
  color: ${({ theme }) => theme.palette.white};
  cursor: pointer;
  ${({ design }) => {
    if (design === 'list') {
      return css`
        padding: 0;
        background-color: ${({ theme }) => theme.palette.bgColor};
        color: ${({ theme }) => theme.palette.black};
      `;
    }
  }}
`;

export default ChatButton;
