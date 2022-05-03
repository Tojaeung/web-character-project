import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@src/store/requests/session.request';
import { useAppDispatch } from '@src/store/app/hook';
import { closeModal } from '@src/store/slices/modal.slice';
import Input from '@src/components/Input';
import { greenButtonStyle } from '@src/styles/button.style';
import { updatePw } from '@src/store/requests/user.request';

function ChangePw() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [currentPw, setCurrentPw] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirmation, setPwConfirmation] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <Label htmlFor="currentPw">현재 비밀번호</Label>
        <Input
          color="green"
          autoComplete="off"
          type="password"
          value={currentPw}
          onChange={(e) => setCurrentPw(e.target.value)}
        />
      </InputBox>

      <InputBox>
        <Label htmlFor="pw">변경할 비밀번호</Label>
        <Input color="green" autoComplete="off" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
      </InputBox>

      <InputBox>
        <Label htmlFor="pwConfirmation">변경할 비밀번호 확인</Label>
        <Input
          color="green"
          autoComplete="off"
          type="password"
          value={pwConfirmation}
          onChange={(e) => setPwConfirmation(e.target.value)}
        />
      </InputBox>

      <SubmitButton type="submit">비밀번호 변경하기</SubmitButton>
    </Form>
  );
}
const Form = styled.form`
  width: 32rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const Title = styled.h1`
  align-self: flex-start;
  font-size: 2rem;
  font-weight: 700;
`;
const Content = styled.p`
  font-size: 1.5rem;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const Label = styled.label`
  font-size: 1.5rem;
  align-self: flex-start;
  white-space: nowrap;
`;
const SubmitButton = styled.button`
  ${greenButtonStyle};
  width: 100%;
  padding: 1rem 0;
`;

export default ChangePw;
