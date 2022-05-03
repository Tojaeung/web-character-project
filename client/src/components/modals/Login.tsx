import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineEye, AiOutlineMail, AiOutlineEyeInvisible } from 'react-icons/ai';
import { signIn } from '@src/store/requests/session.request';
import { useAppDispatch } from '@src/store/app/hook';
import { openModal, closeModal } from '@src/store/slices/modal.slice';
import Input from '@src/components/Input';
import { greenButtonStyle } from '@src/styles/button.style';
import socket from '@src/utils/socket';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [hidePw, setHidePw] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(signIn({ email, pw })).unwrap();
      socket.connect();
      await dispatch(closeModal());
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
      <Logo>기업로고</Logo>

      <InputBox>
        <Label htmlFor="email">이메일</Label>
        <Input
          color="green"
          type="text"
          placeholder="이메일 (email@xxxxx.com)"
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
          placeholder="영문,숫자.특수문자 조합하여 8자리 이상"
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
  width: 28rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
`;
const Logo = styled.h1``;

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

const MailIcon = styled(AiOutlineMail)`
  position: absolute;
  font-size: 2rem;
  top: 3.5rem;
  right: 1.5rem;
`;
const ShowPwIcon = styled(AiOutlineEye)`
  position: absolute;
  font-size: 2rem;
  top: 3.5rem;
  right: 1.5rem;
`;
const HidePwIcon = styled(AiOutlineEyeInvisible)`
  position: absolute;
  font-size: 2rem;
  top: 3.5rem;
  right: 1.5rem;
`;

const SubmitButton = styled.button`
  ${greenButtonStyle};
  width: 100%;
  padding: 1rem 0;
  font-size: 1.5rem;
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
`;

const Boundary = styled.span``;

const SignUp = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
