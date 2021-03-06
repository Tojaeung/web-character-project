import React, { useState, useRef, useEffect } from 'react';
import { IoIosSend } from 'react-icons/io';
import { AiOutlineCamera } from 'react-icons/ai';
import styled from 'styled-components';
import moment from 'moment';
import socket from 'utils/socket';
import instance from 'utils/axios.util';
import { selectUserUser } from 'store/slices/user.slice';
import { selectChatSelectedChat, selectChatMessages } from 'store/slices/chat.slice';
import { useAppSelector } from 'store/app/hook';
import { greenInputStyle } from 'styles/input.style';
import { greenButtonStyle } from 'styles/button.style';

function ChatForm() {
  const user = useAppSelector(selectUserUser);
  const selectedChat = useAppSelector(selectChatSelectedChat);
  const messages = useAppSelector(selectChatMessages);

  // 대화방에서 상대방이 나갔다면 더이상 채팅입력을 하지 못하게 한다.
  const [isEndChat, setIsEndChat] = useState(false);
  useEffect(() => {
    const isEndMessage = messages
      .filter((message) => message.from === selectedChat?.chatId || message.to === selectedChat?.chatId)
      .some((message) => message.type === 'end');
    isEndMessage && setIsEndChat(true);
  }, [messages, selectedChat?.chatId]);

  const targetRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);

  // 텍스트 메세지
  const handleSendTextMessage = async (e: any) => {
    const textMessageObj = {
      type: 'text',
      to: selectedChat?.chatId,
      from: user?.chatId,
      content: message,
      date: moment().format(),
    };

    if (message === '') return alert('입력된 글자가 없습니다.');
    if (!textMessageObj.to) {
      setMessage('');
      return alert('대화상대를 찾을 수 없습니다.');
    }

    socket.emit('addMessage', textMessageObj);
    socket.emit('addMessageNoti', { from: user?.chatId, to: selectedChat?.chatId });
    socket.emit('deleteMessageNoti', selectedChat?.chatId);
    setMessage('');
  };

  // 이미지 메세지
  const handleSendImageMessage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedChat) return alert('대화상대를 찾을 수 없습니다.');
    if (!e.target?.files) return;

    const file = e.target.files[0];
    const allowedExtension = ['image/png', 'image/jpeg', 'image/jpg'];
    const sizeLimit = 1024 * 1024 * 10;

    // 파일 확장자 검사
    if (!allowedExtension.includes(file.type)) return alert('(.png, .jpeg, .jpg) 파일만 업로드 가능합니다.');
    // 파일 사이즈 검사
    if (file.size > sizeLimit) return alert('파일용량은 최대 10MB 입니다.');

    try {
      const formData = new FormData();
      formData.append('imageMessage', e.target?.files[0]);
      formData.append('chatUserId', selectedChat?.chatId);
      formData.append('chatId', user?.chatId as string);
      formData.append('messageDate', moment().format());
      const res = await instance.post('/chat/image-message', formData);
      const { imageMessageObj } = res.data;
      socket.emit('addMessage', imageMessageObj);
      socket.emit('addMessageNoti', { from: user?.chatId, to: selectedChat?.chatId });
      socket.emit('deleteMessageNoti', selectedChat?.chatId);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <FileInput
        type="file"
        accept=".png, .jpeg, .jpg"
        disabled={isEndChat && true}
        ref={targetRef}
        onChange={handleSendImageMessage}
      />
      <CameraIcon onClick={(e) => targetRef.current?.click()} />

      <Input
        type="text"
        placeholder="메세지를 입력하세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendTextMessage(e)}
      />
      <SendButton disabled={(!message && true) || (isEndChat && true)} onClick={handleSendTextMessage}>
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
  min-height: 5rem;
  max-height: 5rem;
`;
const FileInput = styled.input`
  display: none;
`;
const CameraIcon = styled(AiOutlineCamera)`
  font-size: 4rem;
  cursor: pointer;
`;

const Input = styled.input`
  ${greenInputStyle};
`;

const SendButton = styled.button`
  ${greenButtonStyle};
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
