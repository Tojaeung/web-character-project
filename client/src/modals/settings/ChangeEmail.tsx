import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import { signOut } from '@src/store/requests/session.request';
import Input from '@src/components/Input';
import Button from '@src/components/Button';
import { verifyEmail } from '@src/store/requests/user.request';

function ChangeEmail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [updatedEmail, setUpdatedEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const res = await dispatch(verifyEmail({ updatedEmail })).unwrap();
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
      <Title>이메일 변경</Title>
      <Content>
        변경할 이메일 주소를 정확하게 입력해주세요.🔍
        <br />
        <i>'인증메일'</i>이 전송됩니다.
      </Content>
      <InputBox>
        <Input
          color="green"
          type="text"
          placeholder="이메일 (email@xxxxx.com)"
          autoComplete="off"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
        <MailIcon />
      </InputBox>

      <SubmitButton type="submit" color="green" size="medium">
        인증메일 보내기
      </SubmitButton>
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

const MailIcon = styled(AiOutlineMail)`
  position: absolute;
  font-size: 2rem;
  top: 3.5rem;
  right: 1.5rem;
`;

const SubmitButton = styled(Button)``;

export default ChangeEmail;
