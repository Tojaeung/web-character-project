import React, { useState, useEffect } from 'react';
import { BsChatLeftText } from 'react-icons/bs';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectMsgNotis } from '@src/redux/slices/chat.slice';
import { openChatModal, closeChatModal, selectChatOk } from '@src/redux/slices/chat.slice';

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
    <>
      <Container chatOk={chatOk} onClick={onChatModal}>
        {totalMsgNotiNum === 0 ? null : (
          <div className="noti">
            <span className="noti-number">{totalMsgNotiNum}</span>
          </div>
        )}

        <BsChatLeftText className="icon" />
      </Container>
    </>
  );
}
const Container = styled.div<{ chatOk: boolean }>`
  position: relative;
  padding: 0.5rem;
  background: ${({ theme, chatOk }) => chatOk && theme.palette.gray};
  cursor: pointer;
  &:hover {
    border: 1px solid ${({ theme }) => theme.palette.gray};
  }

  .noti {
    position: absolute;
    border-radius: 50%;
    top: 25px;
    left: 30px;
    padding: 0.5rem;
    background-color: red;
  }

  .noti-number {
    color: white;
  }

  .icon {
    font-size: 2.5rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

export default Chat;
