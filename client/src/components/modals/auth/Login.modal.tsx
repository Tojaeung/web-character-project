import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginUser } from '@src/store/requests/auth.request';
import { useAppDispatch } from '@src/store/app/hook';
import { openModal, closeModal } from '@src/store/slices/modal.slice';
import { AuthFormTypes } from '@src/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EmailInput, PwInput } from '@src/components/react-hook-form/AuthForm';
import StyledButton from '@src/styles/StyledButton';
import ModalContainer from '@src/components/modals/ModalContainer';

function LoginModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormTypes>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthFormTypes> = async (data) => {
    const response = await dispatch(loginUser({ email: data.email!, pw: data.pw! })).unwrap();
    const { ok, message } = response;
    if (!ok) return alert(message);
    await dispatch(closeModal());
    navigate(0);
    localStorage.setItem('login', 'on');
  };

  const onClickFindPw = async (e: React.MouseEvent<HTMLSpanElement>) => {
    await dispatch(closeModal());
    await dispatch(openModal({ mode: 'findPw' }));
  };

  const onClickRegister = async (e: React.MouseEvent<HTMLSpanElement>) => {
    await dispatch(closeModal());
    navigate('/auth/register');
  };

  // if (!openModal) return null;
  return (
    <ModalContainer width={32}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Logo>기업로고</Logo>

        <EmailInput label="이메일" name="email" register={register} error={errors.email} />
        <PwInput label="비밀번호" name="pw" register={register} error={errors.pw} />

        <LoginButton type="submit" color="green" size="medium">
          로그인
        </LoginButton>

        <GuideBox>
          <FindPw onClick={onClickFindPw}>비밀번호찾기</FindPw>
          <Boundary> | </Boundary>
          <SignUp onClick={onClickRegister}>회원가입</SignUp>
        </GuideBox>
      </Form>
    </ModalContainer>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
`;
const Logo = styled.h1``;

const LoginButton = styled(StyledButton)`
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

export default LoginModal;
