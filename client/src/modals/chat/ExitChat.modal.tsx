import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { closeModal } from '@src/store/slices/modal.slice';
import { selectChatUser, isChatUser } from '@src/store/slices/chat.slice';
import socket from '@src/utils/socket';
// import { greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';

function ExitChatModal() {
  const dispatch = useAppDispatch();
  const chatUser = useAppSelector(selectChatUser);

  const onExitChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    socket.emit('deleteChat', chatUser?.userId);
    socket.emit('deleteMessage', chatUser?.userId);
    socket.emit('deleteMsgNoti', chatUser?.userId);
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

const Container = styled.div`
  width: 30rem;
  height: 15rem;
  border-radius: 10px;
  padding: 1rem;
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  background-color: ${({ theme }) => theme.palette.white};
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 1003;

  .closeBtn {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2rem;
    cursor: pointer;
    align-self: flex-end;
  }
  .content {
    font-size: 1.5rem;
    padding: 2rem 0;
  }
  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }
  .confirmBtn {
    font-size: 1.2rem;
    padding: 1rem;
    cursor: pointer;
    align-self: flex-end;

    margin-right: 1rem;
  }
  .cancelBtn {
    font-size: 1.2rem;
    padding: 1rem;
    cursor: pointer;
    align-self: flex-end;
  }
`;

export default ExitChatModal;
