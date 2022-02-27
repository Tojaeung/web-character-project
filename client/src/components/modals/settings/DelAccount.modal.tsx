import React, { useState } from 'react';
import { Container } from './DelAccount.modal.styled';
import { AiOutlineClose, AiOutlineWarning } from 'react-icons/ai';
import axios from 'axios';
import socket from '@src/utils/socket';
import { logoutUser } from '@src/redux/requests/auth.request';
import { useAppDispatch } from '@src/redux/app/hook';
import { closeModal } from '@src/redux/slices/modal.slice';

function DelAccountModal() {
  const dispatch = useAppDispatch();
  const [confirmText, setConfirmText] = useState('');

  const onCloseModal = async (e: any) => {
    await dispatch(closeModal());
    setConfirmText('');
  };

  const onDelAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await axios.get('/api/settings/account/delAccount', { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    socket.emit('deleteUser');
    await dispatch(closeModal());
    await dispatch(logoutUser());
  };

  return (
    <Container confirmText={confirmText}>
      <div className="delAccount">
        <AiOutlineClose className="closeBtn" onClick={onCloseModal} />
        <div className="title">정말 탈퇴하시겠습니까?</div>
        <div className="caution-wrapper">
          <AiOutlineWarning className="caution-icon" />
          탈퇴시, 작성했던 글,댓글 등 모든것들이 삭제됩
        </div>
        <div className="guide">
          <span>'계정탈퇴'</span> 를 입력하면 버튼이 활성화 됩니다.
        </div>
        <input
          className="input"
          type="text"
          placeholder="계정탈퇴"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
        />
        <button className="btn" disabled={confirmText === '계정탈퇴' ? false : true} onClick={onDelAccount}>
          계정탈퇴
        </button>
      </div>
    </Container>
  );
}

export default DelAccountModal;
