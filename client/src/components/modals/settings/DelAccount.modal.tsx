import React, { useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import axios from 'axios';
import styled, { css } from 'styled-components';
import socket from '@src/utils/socket';
import { logoutUser } from '@src/store/requests/auth.request';
import { useAppDispatch } from '@src/store/app/hook';
import { closeModal } from '@src/store/slices/modal.slice';
import StyledInput from '@src/styles/StyledInput';

function DelAccountModal() {
  const dispatch = useAppDispatch();
  const [confirmText, setConfirmText] = useState('');

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
    <Container>
      <Title>정말 탈퇴하시겠습니까?</Title>

      <WarningBox>
        <WarnIcon />
        <WarningText>탈퇴시, 작성했던 글,댓글 등 모든것들이 삭제됩니다.</WarningText>
      </WarningBox>

      <GuideText>
        <i>'계정탈퇴'</i> 를 입력하면 버튼이 활성화 됩니다.
      </GuideText>

      <StyledInput
        className="input"
        type="text"
        placeholder="계정탈퇴"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
      />

      <SubmitButton
        disabled={confirmText === '계정탈퇴' ? false : true}
        confirmText={confirmText}
        onClick={onDelAccount}
      >
        계정탈퇴
      </SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const Title = styled.h2`
  align-self: flex-start;
`;
const WarningBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dotted;
  border-bottom: 1px dotted;
  padding: 0.5rem 0;
`;

const WarnIcon = styled(AiOutlineWarning)`
  font-size: 4rem;
  color: red;
`;
const WarningText = styled.p``;
const GuideText = styled.p``;
const SubmitButton = styled.button<{ confirmText: string }>`
  ${({ theme, confirmText }) => {
    if (confirmText === '계정탈퇴') {
      return css`
        border: 0;
        outline: 0;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: ${({ theme }) => theme.palette.white};
        font-weight: bold;
        background-color: ${theme.palette.red};
      `;
    } else {
      return css`
        border: 0;
        outline: 0;
        padding: 1rem 2rem;
        border-radius: 5px;
        background-color: ${theme.palette.gray};
      `;
    }
  }}
`;

export default DelAccountModal;
