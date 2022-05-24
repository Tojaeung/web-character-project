import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'store/app/hook';
import { closeModal } from 'store/slices/modal.slice';
import { selectChat, selectChatSelectedChat } from 'store/slices/chat.slice';
import socket from 'utils/socket';
import { greenButtonStyle } from 'styles/button.style';

function ExitChat() {
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector(selectChatSelectedChat);

  const onExitChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit('deleteChat', selectedChat?.chatId);
    socket.emit('deleteMessage', selectedChat?.chatId);
    socket.emit('deleteMessageNoti', selectedChat?.chatId);
    dispatch(selectChat({ chat: null }));
    await dispatch(closeModal());
  };

  return (
    <Container>
      <Content>
        <i>{selectedChat?.nickname}</i>님과
        <br /> 채팅을 종료하시겠습니까?
      </Content>

      <ExitChatButton onClick={onExitChat}>확인</ExitChatButton>
    </Container>
  );
}
const Container = styled.div`
  width: 25rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
`;
const Content = styled.p`
  font-size: 1.3rem;
`;
const ExitChatButton = styled.button`
  align-self: center;
  ${greenButtonStyle};
  padding: 0.8rem 1rem;
`;

export default ExitChat;
