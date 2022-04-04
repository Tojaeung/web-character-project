import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginUser } from '@src/store/requests/auth.request';
import { useAppDispatch } from '@src/store/app/hook';
import { openModal, closeModal } from '@src/store/slices/modal.slice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthInputsType, EmailInput, PwInput } from '@src/components/AuthInputs';
import Button from '@src/components/Button';

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputsType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthInputsType> = async (data) => {
    await dispatch(loginUser({ email: data.email!, pw: data.pw! }));
    await dispatch(closeModal());
    navigate(0);
  };

  const openFindPw = async (e: React.MouseEvent<HTMLSpanElement>) => {
    await dispatch(closeModal());
    await dispatch(openModal({ mode: 'findPw' }));
  };

  const moveSignUp = async (e: React.MouseEvent<HTMLSpanElement>) => {
    await dispatch(closeModal());
    navigate('/auth/signUp');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Logo>기업로고</Logo>

      <EmailInput label="이메일" name="email" register={register} error={errors.email} />
      <PwInput label="비밀번호" name="pw" register={register} error={errors.pw} />

      <LoginButton type="submit" color="green" size="medium">
        로그인
      </LoginButton>

      <GuideBox>
        <FindPw onClick={openFindPw}>비밀번호찾기</FindPw>
        <Boundary> | </Boundary>
        <SignUp onClick={moveSignUp}>회원가입</SignUp>
      </GuideBox>
    </Form>
  );
}

const Form = styled.form`
  width: 32rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
`;
const Logo = styled.h1``;

const LoginButton = styled(Button)`
  width: 100%;
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
