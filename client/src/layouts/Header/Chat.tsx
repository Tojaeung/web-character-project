import React, { useState, useEffect } from 'react';
import { BsChatLeftText } from 'react-icons/bs';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'store/app/hook';
import { selectChatMessageNotis } from 'store/slices/chat.slice';
import { openChatModal, closeChatModal, selectChatOk } from 'store/slices/chat.slice';

interface IProp {
  chatRef: React.MutableRefObject<HTMLDivElement | null>;
}

function Chat({ chatRef }: IProp) {
  const dispatch = useAppDispatch();
  const chatOk = useAppSelector(selectChatOk);
  const messageNotis = useAppSelector(selectChatMessageNotis);
  const [totalMessageNotiNum, setTotalMessageNotiNum] = useState<number>(0);

  useEffect(() => {
    setTotalMessageNotiNum(messageNotis.length);
  }, [messageNotis]);

  const onChatModal = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chatOk) return await dispatch(openChatModal());
    await dispatch(closeChatModal());
  };

  return (
    <Container ref={chatRef} chatOk={chatOk} onClick={onChatModal}>
      {totalMessageNotiNum === 0 ? null : (
        <NotiBox>
          <NotiNum>{totalMessageNotiNum}</NotiNum>
        </NotiBox>
      )}

      <ChatIcon />
    </Container>
  );
}

const Container = styled.div<{ chatOk: boolean }>`
  position: relative;
  cursor: pointer;
`;

const ChatIcon = styled(BsChatLeftText)`
  font-size: 2.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2rem;
  }
`;

const NotiBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  background-color: red;
  border-radius: 100%;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
`;

const NotiNum = styled.span`
  font-size: 1.2rem;
  color: white;
`;

export default Chat;
