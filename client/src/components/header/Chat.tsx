import React, { useState } from 'react';
import { BsChatLeftText } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { Container } from '@src/components/header/Chat.styled';

function Chat() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <Container openChat={openChat}>
      <div className="chat" onClick={(e) => setOpenChat(!openChat)}>
        <BsChatLeftText className="chat__icon" />
      </div>
      {openChat && (
        <div className="chatBot">
          <div className="chatBot__list"></div>
          <div className="chatBot__wrapper">
            <div className="chatBot__title">
              <span className="chatBot__title-nickname">채팅시작</span>
              <AiOutlineClose className="chatBot__title-closeBtn" onClick={(e) => setOpenChat(!openChat)} />
            </div>
            <div className="chatBot__talk"></div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Chat;
