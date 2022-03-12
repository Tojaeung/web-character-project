import React, { useState, useRef } from 'react';
import { IoIosSend } from 'react-icons/io';
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios';
import styled from 'styled-components';
import socket from '@src/utils/socket';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { selectChatUser } from '@src/redux/slices/chat.slice';
import { useAppSelector, useAppDispatch } from '@src/redux/app/hook';
import { greenInputStyle, greenButtonStyle } from '@src/styles/GlobalStyles';
import moment from 'moment';

function ChatFooter() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const chatUser = useAppSelector(selectChatUser);

  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);

  // 텍스트 메세지
  const onSendTextMsg = async (e: any) => {
    const textMsgObj = {
      type: 'text',
      to: chatUser?.userId,
      from: user?.userId,
      content: message,
      date: moment().format(),
    };

    if (message === '') return;
    if (!textMsgObj.to) {
      alert('대화상대를 찾을 수 없습니다.');
      setMessage('');
      return;
    }

    socket.emit('addMessage', textMsgObj);
    socket.emit('addMsgNoti', { from: user?.userId, to: chatUser?.userId });
    socket.emit('deleteMsgNoti', chatUser?.userId);
    setMessage('');
  };

  // 이미지 메세지
  const onSendImgMsg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    if (!chatUser) {
      alert('대화상대를 찾을 수 없습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('imgMessage', e.target?.files[0]);
    formData.append('chatId', chatUser?.userId);
    formData.append('userId', user?.userId as string);
    formData.append('messageDate', moment().format());
    const response = await axios.post('/api/chat/imgMessage', formData, { withCredentials: true });
    const { ok, imgMsgObj } = response.data;
    if (!ok) return;
    socket.emit('addMessage', imgMsgObj);
    socket.emit('addMsgNoti', { from: user?.userId, to: chatUser?.userId });
    socket.emit('deleteMsgNoti', chatUser?.userId);
  };

  return (
    <Container>
      <input
        className="file-input"
        type="file"
        accept="image/png, image/jpeg.image/jpg"
        ref={inputRef}
        onChange={onSendImgMsg}
      />
      <AiOutlineCamera className="camera-icon" onClick={(e) => inputRef.current?.click()} />

      <div className="text">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSendTextMsg(e)}
        />
        <button disabled={!message ? true : false} onClick={onSendTextMsg}>
          <IoIosSend className="send-icon" />
        </button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem 0 1rem;
  .file-input {
    display: none;
  }
  .camera-icon {
    font-size: 3rem;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.palette.gray};
    }
  }
  .text {
    display: flex;
    width: 100%;
    input {
      ${greenInputStyle};
      margin: 0rem 1rem;
    }
    button {
      ${greenButtonStyle};
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.6rem;
    }
    .send-icon {
      font-size: 2.5rem;
    }
  }
`;

export default ChatFooter;
