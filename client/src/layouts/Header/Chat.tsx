import React, { useState, useEffect } from 'react';
import { BsChatLeftText, BsChatLeftTextFill } from 'react-icons/bs';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectMsgNotis } from '@src/store/slices/chat.slice';
import { openChatModal, closeChatModal, selectChatOk } from '@src/store/slices/chat.slice';
import NotiCount from '@src/components/NotiCount';

function Chat() {
  // 확인 안한 메세지 알림 수
  const dispatch = useAppDispatch();
  const chatOk = useAppSelector(selectChatOk);
  const msgNotis = useAppSelector(selectMsgNotis);
  const [totalMsgNotiNum, setTotalMsgNotiNum] = useState<number>();

  useEffect(() => {
    const chatModalStatus = localStorage.getItem('chat');
    if (!chatModalStatus) return;
    dispatch(openChatModal());
  }, []);

  useEffect(() => {
    const totalMsgNotiNum = msgNotis.length;
    setTotalMsgNotiNum(totalMsgNotiNum);
  }, [msgNotis]);

  const onChatModal = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chatOk) {
      localStorage.setItem('chat', 'on');
      await dispatch(openChatModal());
      return;
    }
    localStorage.removeItem('chat');
    await dispatch(closeChatModal());
  };

  return (
    <Container chatOk={chatOk} onClick={onChatModal}>
      {totalMsgNotiNum === 0 ? null : (
        <NotiBox>
          <NotiCount notiNum={totalMsgNotiNum!} />
        </NotiBox>
      )}

      {chatOk ? <ChatFillIcon /> : <ChatIcon />}
    </Container>
  );
}

const Container = styled.div<{ chatOk: boolean }>`
  position: relative;
  padding: 0.5rem;

  cursor: pointer;
`;

const NotiBox = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;
const ChatIcon = styled(BsChatLeftText)`
  font-size: 2.5rem;
`;
const ChatFillIcon = styled(BsChatLeftTextFill)`
  font-size: 2.5rem;
`;

export default Chat;
