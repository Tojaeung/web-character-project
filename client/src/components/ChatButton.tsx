import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectChats, openChatModal } from '@src/store/slices/chat.slice';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import socket from '@src/utils/socket';
import Button from '@src/components/Button';

interface IProps {
  chatPartnerId: number;
  chatPartnerUserId: string;
}

function ChatButton({ chatPartnerId, chatPartnerUserId }: IProps) {
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
      {chatPartnerId === user?.id ? null : (
        <Container>
          {!isChatting ? (
            <StartChatButton color="green" size="small" responsive={true} onClick={onAddChat}>
              채팅하기
            </StartChatButton>
          ) : (
            <ChattingButton color="red" size="small" responsive={true}>
              채팅중...
            </ChattingButton>
          )}
        </Container>
      )}
    </>
  );
}
const Container = styled.div``;
const StartChatButton = styled(Button)``;
const ChattingButton = styled(Button)``;

export default ChatButton;
