import React from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ModalContainer from '@src/components/ModalContainer';
import { EmailInput } from '@src/components/react-hook-form/AuthForm';
import { AuthFormTypes } from '@src/types';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import StyledButton from '@src/styles/StyledButton';

function FindPw() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormTypes>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthFormTypes> = async (data) => {
    const response = await axios.post('/api/auth/findPw', data);
    const { ok, message } = response.data;
    if (!ok) return alert(message);
    await dispatch(closeModal());
    alert(message);
    navigate('/');
  };

  return (
    <ModalContainer width={40}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>비밀번호를 잃어버리셨나요?😂😂</Title>
        <Content>
          기업이름에 가입한 이메일을 정확히 입력해 주세요.🌙 이메일을 통해 비밀번호 수정 링크가 전송됩니다.🌤
        </Content>

        <EmailInput label="이메일" name="email" register={register} error={errors.email} />

        <SubmitButton type="submit" color="green" size="medium">
          인증메일 보내기
        </SubmitButton>
      </Form>
    </ModalContainer>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const Title = styled.h2``;
const Content = styled.p`
  font-size: 1.5rem;
`;
const SubmitButton = styled(StyledButton)`
  width: 100%;
`;

export default FindPw;
