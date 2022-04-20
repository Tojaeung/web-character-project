import React, { useState, useRef, useEffect } from 'react';
import { IoIosSend } from 'react-icons/io';
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios';
import styled from 'styled-components';
import moment from 'moment';
import socket from '@src/utils/socket';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { selectChatIsChatUser, selectMessages } from '@src/store/slices/chat.slice';
import { useAppSelector } from '@src/store/app/hook';
import Input from '@src/components/Input';
import Button from '@src/components/Button';

function ChatForm() {
  const user = useAppSelector(selectAuthUser);
  const isChatUser = useAppSelector(selectChatIsChatUser);
  const messages = useAppSelector(selectMessages);

  // 대화방에서 상대방이 나갔다면 더이상 채팅입력을 하지 못하게 한다.
  const [isEndChat, setIsEndChat] = useState(false);
  useEffect(() => {
    const isEndGuideMessage = messages
      .filter((message) => message.from === isChatUser?.chatId || message.to === isChatUser?.chatId)
      .some((message) => message.type === 'endChat');
    isEndGuideMessage && setIsEndChat(true);
  }, [messages, isChatUser?.chatId]);

  const targetRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);

  // 텍스트 메세지
  const onSendTextMsg = async (e: any) => {
    const textMsgObj = {
      type: 'text',
      to: isChatUser?.chatId,
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
    socket.emit('addMsgNoti', { from: user?.chatId, to: isChatUser?.chatId });
    socket.emit('deleteMsgNoti', isChatUser?.chatId);
    setMessage('');
  };

  // 이미지 메세지
  const onSendImgMsg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    if (!isChatUser) {
      alert('대화상대를 찾을 수 없습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('imgMessage', e.target?.files[0]);
    formData.append('chatUserId', isChatUser?.chatId);
    formData.append('chatId', user?.chatId as string);
    formData.append('messageDate', moment().format());
    const response = await axios.post('/api/chat/imgMessage', formData, { withCredentials: true });
    const { ok, imgMsgObj } = response.data;
    if (!ok) return;
    socket.emit('addMessage', imgMsgObj);
    socket.emit('addMsgNoti', { from: user?.chatId, to: isChatUser?.chatId });
    socket.emit('deleteMsgNoti', isChatUser?.chatId);
  };

  return (
    <Container>
      <FileInput
        className="file-input"
        type="file"
        accept="image/png, image/jpeg.image/jpg"
        disabled={isEndChat && true}
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
      <SendButton
        color="green"
        size="small"
        disabled={(!message && true) || (isEndChat && true)}
        onClick={onSendTextMsg}
      >
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
export default ChatForm;
