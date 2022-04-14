import React, { useState, useRef } from 'react';
import { IoIosSend } from 'react-icons/io';
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios';
import styled from 'styled-components';
import moment from 'moment';
import socket from '@src/utils/socket';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { selectChatUser } from '@src/store/slices/chat.slice';
import { useAppSelector } from '@src/store/app/hook';
import Input from '@src/components/Input';
import Button from '@src/components/Button';

function ChatFooter() {
  const user = useAppSelector(selectAuthUser);
  const chatUser = useAppSelector(selectChatUser);

  const targetRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);

  // 텍스트 메세지
  const onSendTextMsg = async (e: any) => {
    const textMsgObj = {
      type: 'text',
      to: chatUser?.chatId,
      from: user?.chatId,
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
    socket.emit('addMsgNoti', { from: user?.chatId, to: chatUser?.chatId });
    socket.emit('deleteMsgNoti', chatUser?.chatId);
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
    formData.append('chatUserId', chatUser?.chatId);
    formData.append('chatId', user?.chatId as string);
    formData.append('messageDate', moment().format());
    const response = await axios.post('/api/chat/imgMessage', formData, { withCredentials: true });
    const { ok, imgMsgObj } = response.data;
    if (!ok) return;
    socket.emit('addMessage', imgMsgObj);
    socket.emit('addMsgNoti', { from: user?.chatId, to: chatUser?.chatId });
    socket.emit('deleteMsgNoti', chatUser?.chatId);
  };

  return (
    <Container>
      <FileInput
        className="file-input"
        type="file"
        accept="image/png, image/jpeg.image/jpg"
        ref={targetRef}
        onChange={onSendImgMsg}
      />
      <CameraIcon onClick={(e) => targetRef.current?.click()} />

      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSendTextMsg(e)}
      />
      <SendButton color="green" size="small" disabled={!message ? true : false} onClick={onSendTextMsg}>
        <SendIcon />
      </SendButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  gap: 1rem;
  background-color: ${({ theme }) => theme.palette.bgColor};
  border-top: 1px solid ${({ theme }) => theme.palette.gray};
`;
const FileInput = styled.input`
  display: none;
`;
const CameraIcon = styled(AiOutlineCamera)`
  font-size: 4rem;
  cursor: pointer;
`;
const SendButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem !important;
  border: 0;
  background-color: ${({ theme }) => theme.palette.green};
`;
const SendIcon = styled(IoIosSend)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.palette.white};
`;

const Container1 = styled.div`
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
      margin: 0rem 1rem;
    }
    button {
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
