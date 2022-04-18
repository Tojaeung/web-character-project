import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
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
    try {
      await dispatch(loginUser({ email: data.email!, pw: data.pw! }))
        .unwrap()
        .then((res) => {
          const { user } = res;

          // 관리자 유무 확인
          if (user?.role === 'admin') return localStorage.setItem('admin', 'ok');
          localStorage.removeItem('admin');

          // 패널티를 먹은 불량유저인지 확인
          if (user?.exp === null && localStorage.getItem('penalty')) {
            return;
          } else if (user?.exp === null && !localStorage.getItem('penalty')) {
            const startDate = moment().format('YYYY-MM-DD LT');
            const expireDate = moment().add(5, 'minutes').format('YYYY-MM-DD LT');
            const penalty = { startDate, expireDate };

            return localStorage.setItem('penalty', JSON.stringify(penalty));
          }
        });
      await dispatch(closeModal());
      localStorage.setItem('login', 'on');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const openFindPw = async (e: React.MouseEvent<HTMLSpanElement>) => {
    await dispatch(closeModal());
    await dispatch(openModal({ mode: 'findPw' }));
  };

  const toSignUp = async (e: React.MouseEvent<HTMLSpanElement>) => {
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
        <SignUp onClick={toSignUp}>회원가입</SignUp>
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
