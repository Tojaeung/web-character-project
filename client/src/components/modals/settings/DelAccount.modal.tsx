import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineWarning } from 'react-icons/ai';
import axios from 'axios';
import styled from 'styled-components';
import socket from '@src/utils/socket';
import { logoutUser } from '@src/redux/requests/auth.request';
import { useAppDispatch } from '@src/redux/app/hook';
import { closeModal } from '@src/redux/slices/modal.slice';
import { redButtonStyle, greenInputStyle } from '@src/styles/GlobalStyles';

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

const Container = styled.div<{ confirmText: string }>`
  .delAccount {
    width: 40rem;
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.palette.white};
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: 10px;
  }

  .closeBtn {
    align-self: flex-end;
    font-size: 2.5rem;
    cursor: pointer;
  }

  .title {
    align-self: flex-start;
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  .caution-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    border-top: 1px solid ${({ theme }) => theme.palette.red};
    border-bottom: 1px solid ${({ theme }) => theme.palette.red};
    background-color: ${({ theme }) => theme.palette.pink1};
    margin-bottom: 2rem;
  }

  .caution-icon {
    font-size: 3rem;
    margin: 1rem;
  }
  .guide {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    span {
      font-size: 1.8rem;
      font-weight: 700;
    }
  }
  .input {
    ${greenInputStyle};
    margin-bottom: 2rem;
  }
  .btn {
    ${({ confirmText }) => {
      if (confirmText !== '계정탈퇴') {
        return null;
      }
      return redButtonStyle;
    }}
    padding: 0.5rem;
    width: 70%;
  }

  @media ${({ theme }) => theme.device.mobile} {
    .delAccount {
      width: 30rem;
    }
    .title {
      font-size: 2rem;
    }
    .guide {
      font-size: 1.2rem;
    }
    .caution-wrapper {
      font-size: 1rem;
    }
    .submitBtn {
      padding: 1rem;
      font-size: 1.2rem;
    }
    .cancelBtn {
      padding: 1rem;
      font-size: 1.2rem;
    }
  }
`;

export default DelAccountModal;
