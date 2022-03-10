import React, { useState, useRef } from 'react';
import { IoIosSend } from 'react-icons/io';
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios';
import * as S from './ChatFooter.styled';
import socket from '@src/utils/socket';
import { messageDate } from '@src/utils/date';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { selectChatUser } from '@src/redux/slices/chat.slice';
import { useAppSelector } from '@src/redux/app/hook';

function ChatFooter() {
  const user = useAppSelector(selectAuthUser);
  const chatUser = useAppSelector(selectChatUser);

  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);

  // 텍스트 메세지
  const onSendTextMsg = (e: any) => {
    const textMsgObj = {
      type: 'text',
      to: chatUser?.userId,
      from: user?.userId,
      content: message,
      date: messageDate(),
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
    formData.append('messageDate', messageDate());
    const response = await axios.post('/api/chat/imgMessage', formData, { withCredentials: true });
    const { ok, imgMsgObj } = response.data;
    if (!ok) return;
    socket.emit('addMessage', imgMsgObj);
  };

  return (
    <S.Container>
      <S.imgWrapper>
        <input type="file" accept="image/png, image/jpeg" ref={inputRef} onChange={onSendImgMsg} />
        <AiOutlineCamera className="imgIcon" onClick={(e) => inputRef.current?.click()} />
      </S.imgWrapper>

      <S.textWrapper>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSendTextMsg(e)}
        />
        <button onClick={onSendTextMsg}>
          <IoIosSend className="textIcon" />
        </button>
      </S.textWrapper>
    </S.Container>
  );
}

export default ChatFooter;
