import React, { useState, useEffect } from 'react';
import { BsChatLeftText } from 'react-icons/bs';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectMsgNotis } from '@src/store/slices/chat.slice';
import { openChatModal, closeChatModal, selectChatOk } from '@src/store/slices/chat.slice';
import NotiCount from '@src/components/NotiCount';

interface IProp {
  chatRef: React.MutableRefObject<HTMLDivElement | null>;
}

function Chat({ chatRef }: IProp) {
  const dispatch = useAppDispatch();
  const chatOk = useAppSelector(selectChatOk);
  const msgNotis = useAppSelector(selectMsgNotis);
  const [totalMsgNotiNum, setTotalMsgNotiNum] = useState<number>();

  useEffect(() => {
    const totalMsgNotiNum = msgNotis.length;
    setTotalMsgNotiNum(totalMsgNotiNum);
  }, [msgNotis]);

  const onChatModal = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chatOk) {
      await dispatch(openChatModal());
      return;
    }
    await dispatch(closeChatModal());
  };

  return (
    <Container ref={chatRef} chatOk={chatOk} onClick={onChatModal}>
      {totalMsgNotiNum === 0 ? null : (
        <NotiBox>
          <NotiCount notiNum={totalMsgNotiNum!} />
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

const NotiBox = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;
const ChatIcon = styled(BsChatLeftText)`
  font-size: 2.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2rem;
  }
`;

export default Chat;
