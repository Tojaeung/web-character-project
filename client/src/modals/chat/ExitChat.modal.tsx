import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { closeModal } from '@src/store/slices/modal.slice';
import { selectChatUser, isChatUser } from '@src/store/slices/chat.slice';
import socket from '@src/utils/socket';
import Button from '@src/components/Button';

function ExitChatModal() {
  const dispatch = useAppDispatch();
  const chatUser = useAppSelector(selectChatUser);

  const onExitChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit('deleteChat', chatUser?.userId);
    socket.emit('deleteMessage', chatUser?.userId);
    socket.emit('deleteMsgNoti', chatUser?.userId);
    localStorage.removeItem('chatUser');
    await dispatch(isChatUser({ chatUser: null }));
    await dispatch(closeModal());
  };

  return (
    <Container>
      <Content>
        <i>{chatUser?.nickname}</i>님과
        <br /> 채팅을 종료하시겠습니까?
      </Content>

      <ExitChatButton color="green" size="small" onClick={onExitChat}>
        확인
      </ExitChatButton>
    </Container>
  );
}
const Container = styled.div`
  width: 30rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
`;
const Content = styled.p``;
const ExitChatButton = styled(Button)`
  align-self: center;
`;

export default ExitChatModal;
