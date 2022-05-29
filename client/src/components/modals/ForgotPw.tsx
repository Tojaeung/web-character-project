import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import { closeModal } from 'store/slices/modal.slice';
import { useAppDispatch } from 'store/app/hook';
import { greenInputStyle } from 'styles/input.style';
import { greenButtonStyle } from 'styles/button.style';
import { forgotPw } from 'store/requests/user.request';

function ForgotPw() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await dispatch(forgotPw({ email })).unwrap();
      alert(res.message);
      await dispatch(closeModal());
      navigate('/');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>비밀번호를 잃어버리셨나요?😂😂</Title>
      <Content>
        기업이름에 가입한 이메일을 정확히 입력해 주세요.🌙 이메일을 통해 비밀번호 수정 링크가 전송됩니다.🌤
      </Content>
      <InputBox>
        <Input
          type="text"
          placeholder="이메일 (emailxxxxx.com)"
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
  gap: 2rem;
  @media ${({ theme }) => theme.device.mobile} {
    width: 25rem;
    gap: 1rem;
  }
`;
const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
  }
`;
const Content = styled.p`
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

const MailIcon = styled(AiOutlineMail)`
  position: absolute;
  font-size: 2rem;
  top: 1rem;
  right: 1.5rem;
`;
const SubmitButton = styled.button`
  align-self: center;
  ${greenButtonStyle};
  width: 50%;
  padding: 1rem 0;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
    padding: 0.7rem 1rem;
  }
`;

export default ForgotPw;
