import React, { useState, useEffect } from 'react';
import { BsChatLeftText } from 'react-icons/bs';
import { Container } from '@src/components/header/Chat.styled';
import ChatModal from '@src/components/modals/chat/Chat.modal';
// import socket from '@src/utils/socket';
import { useAppSelector } from '@src/redux/app/hook';
import { selectMsgNotis } from '@src/redux/slices/msgNoti.slice';

function Chat() {
  // 확인 안한 메세지 알림 수
  const msgNotis = useAppSelector(selectMsgNotis);
  const [totalMsgNotiNum, setTotalMsgNotiNum] = useState<number>();

  useEffect(() => {
    const totalMsgNotiNum = msgNotis.length;
    setTotalMsgNotiNum(totalMsgNotiNum);
  }, [msgNotis]);

  // 메세지 모달 열기, 닫기
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    const chatModalStatus = localStorage.getItem('chat');
    if (!chatModalStatus) return;
    setOpenChat(true);
  }, []);

  const onChatModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!openChat) {
      localStorage.setItem('chat', 'on');
      setOpenChat(true);
      // socket.connect();
      return;
    }
    localStorage.removeItem('chat');
    setOpenChat(false);
    // socket.disconnect();
  };

  return (
    <>
      <Container openChat={openChat} onClick={onChatModal}>
        {totalMsgNotiNum === 0 ? null : (
          <div className="noti">
            <span className="noti-number">{totalMsgNotiNum}</span>
          </div>
        )}

        <BsChatLeftText className="chat-icon" />
      </Container>
      <ChatModal openChat={openChat} setOpenChat={setOpenChat} />
    </>
  );
}

export default Chat;
