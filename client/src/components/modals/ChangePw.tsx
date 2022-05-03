import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@src/store/requests/session.request';
import { useAppDispatch } from '@src/store/app/hook';
import { closeModal } from '@src/store/slices/modal.slice';
import { greenInputStyle } from '@src/styles/input.style';
import { greenButtonStyle } from '@src/styles/button.style';
import { updatePw } from '@src/store/requests/user.request';

function ChangePw() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [currentPw, setCurrentPw] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirmation, setPwConfirmation] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        updatePw({ currentPw, updatedPw: pw, updatedPwConfirmation: pwConfirmation })
      ).unwrap();
      alert(res.message);
      await dispatch(closeModal());
      await dispatch(signOut());
      navigate('/');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>비밀번호 변경</Title>

      <Content>변경할 비밀번호를 입력해주세요 🔒🔒</Content>

      <InputBox>
        <Input
          type="password"
          placeholder="현재 비밀번호"
          autoComplete="off"
          value={currentPw}
          onChange={(e) => setCurrentPw(e.target.value)}
        />
      </InputBox>

      <InputBox>
        <Input
          type="password"
          placeholder="변경 비밀번호"
          autoComplete="off"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
      </InputBox>

      <InputBox>
        <Input
          type="password"
          placeholder="변경 비밀번호 확인"
          autoComplete="off"
          value={pwConfirmation}
          onChange={(e) => setPwConfirmation(e.target.value)}
        />
      </InputBox>

      <SubmitButton type="submit">비밀번호 변경하기</SubmitButton>
    </Form>
  );
}
const Form = styled.form`
  width: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  @media ${({ theme }) => theme.device.mobile} {
    width: 25rem;
    gap: 1rem;
  }
`;
const Title = styled.h1`
  align-self: flex-start;
  font-size: 2rem;
  font-weight: 700;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
  }
`;
const Content = styled.p`
  align-self: flex-start;
  font-size: 1.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const Input = styled.input`
  ${greenInputStyle};
`;
const SubmitButton = styled.button`
  ${greenButtonStyle};
  width: 50%;
  padding: 1rem 0;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.7rem 1rem;
    font-size: 1.2rem;
  }
`;

export default ChangePw;
