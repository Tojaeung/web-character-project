import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import { signOut } from '@src/store/requests/session.request';
import { updateEmail } from '@src/store/requests/user.request';
import { greenInputStyle } from '@src/styles/input.style';
import { greenButtonStyle } from '@src/styles/button.style';

function ChangeEmail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const res = await dispatch(updateEmail({ updatedEmail: email })).unwrap();
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
          type="text"
          placeholder="이메일 (email@xxxxx.com)"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MailIcon />
      </InputBox>

      <SubmitButton type="submit">인증메일 보내기</SubmitButton>
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
  font-size: 1.5rem;
  align-self: flex-start;
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

const MailIcon = styled(AiOutlineMail)`
  position: absolute;
  font-size: 2rem;
  top: 1rem;
  right: 1.5rem;
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

export default ChangeEmail;
