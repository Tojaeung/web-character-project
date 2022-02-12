import React from 'react';
import { Container } from './ExitChat.modal.styled';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { closeModal } from '@src/redux/slices/modal.slice';
import { selectChatUser, isChatUser } from '@src/redux/slices/chat.slice';
import socket from '@src/utils/socket';

function ExitChatModal() {
  const dispatch = useAppDispatch();
  const chatUser = useAppSelector(selectChatUser);

  const onExitChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit('deleteChat', chatUser?.id);
    socket.emit('deleteMessage', chatUser?.id);
    socket.emit('deleteMsgNoti', chatUser?.id);
    localStorage.removeItem('chatUser');
    await dispatch(isChatUser({ chatUser: undefined }));
    await dispatch(closeModal());
  };

  return (
    <Container>
      <AiOutlineClose className="closeBtn" onClick={(e) => dispatch(closeModal())} />
      <div className="content">
        {chatUser?.nickname}님과
        <br /> 채팅을 종료하시겠습니까?
      </div>
      <div className="btn-wrapper">
        <button className="confirmBtn" onClick={onExitChat}>
          확인
        </button>
        <button className="cancelBtn" onClick={(e) => dispatch(closeModal())}>
          취소
        </button>
      </div>
    </Container>
  );
}

export default ExitChatModal;
