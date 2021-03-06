import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineEye, AiOutlineMail, AiOutlineEyeInvisible } from 'react-icons/ai';
import useSocketSetup from 'hooks/useSocketSetup';
import { signIn } from 'store/requests/session.request';
import { useAppDispatch } from 'store/app/hook';
import { openModal, closeModal } from 'store/slices/modal.slice';
import { greenInputStyle } from 'styles/input.style';
import { greenButtonStyle } from 'styles/button.style';
import socket from 'utils/socket';
import Logo from 'assets/images/logo.svg';

function Login() {
  useSocketSetup();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [hidePw, setHidePw] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(signIn({ email, pw })).unwrap();
      await socket.connect();
      await dispatch(closeModal());
      navigate(0);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const openForgotPw = async (e: React.MouseEvent<HTMLSpanElement>) => {
    await dispatch(closeModal());
    await dispatch(openModal({ modal: 'forgotPw' }));
  };

  const goSignUp = async (e: React.MouseEvent<HTMLSpanElement>) => {
    await dispatch(closeModal());
    navigate('/signUp');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <img width="200" src={Logo} alt="로고" />

      <InputBox>
        <Label htmlFor="email">이메일</Label>
        <Input
          color="green"
          type="text"
          placeholder="홍길동xxxxx.com"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MailIcon />
      </InputBox>

      <InputBox>
        <Label htmlFor="pw">비밀번호</Label>
        <Input
          color="green"
          type={hidePw ? 'password' : 'text'}
          placeholder="영문,숫자.특수문자 조합 8자리 이상"
          autoComplete="off"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        {hidePw ? <ShowPwIcon onClick={(e) => setHidePw(false)} /> : <HidePwIcon onClick={(e) => setHidePw(true)} />}
      </InputBox>

      <SubmitButton type="submit">로그인</SubmitButton>

      <GuideBox>
        <FindPw onClick={openForgotPw}>비밀번호찾기</FindPw>
        <Boundary> | </Boundary>
        <SignUp onClick={goSignUp}>회원가입</SignUp>
      </GuideBox>
    </Form>
  );
}

const Form = styled.form`
  width: 29rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    gap: 1rem;
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
const Label = styled.label`
  font-size: 1.4rem;
  align-self: flex-start;
  white-space: nowrap;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;

const Input = styled.input`
  ${greenInputStyle};
  &::placeholder {
    font-size: 1.2rem;
  }
`;

const MailIcon = styled(AiOutlineMail)`
  position: absolute;
  font-size: 2rem;
  top: 3.7rem;
  right: 1.5rem;
`;
const ShowPwIcon = styled(AiOutlineEye)`
  position: absolute;
  font-size: 2rem;
  top: 3.7rem;
  right: 1.5rem;
`;
const HidePwIcon = styled(AiOutlineEyeInvisible)`
  position: absolute;
  font-size: 2rem;
  top: 3.7rem;
  right: 1.5rem;
`;

const SubmitButton = styled.button`
  ${greenButtonStyle};
  width: 100%;
  padding: 1rem 0;
  font-size: 1.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;

const GuideBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 1.3rem;
`;
const FindPw = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;

const Boundary = styled.span``;

const SignUp = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;

export default Login;
