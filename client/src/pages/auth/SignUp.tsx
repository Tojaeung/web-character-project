import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AiOutlineUser, AiOutlineEye, AiOutlineMail, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import styled from 'styled-components';
import StyledButton from '@src/styles/StyledButton';
import StyledInput from '@src/styles/StyledInput';
import { openModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';

interface IFormInputType {
  email: string;
  nickname: string;
  pw: string;
  confirmPw: string;
}

function SignUp() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {
    const response = await axios.post('/api/auth/signUp', data);
    const { ok, message } = response.data;
    if (!ok) return alert(message);
    await dispatch(openModal({ mode: 'registerGuide' }));
  };

  const [hidePw, setHidePw] = useState(true);
  const [hideConfirmPw, setHideConfirmPw] = useState(true);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>회원가입📃</Title>

      <InputWrapper>
        <Label htmlFor="email">이메일</Label>
        <StyledInput
          color="green"
          autoComplete="off"
          type="text"
          placeholder="이메일(Tojaeung@xxx.com)"
          style={{ borderColor: errors.email && 'red' }}
          {...register('email', {
            required: { value: true, message: '이메일 입력해주세요.' },
            pattern: {
              value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
              message: '이메일 형식이 아닙니다.',
            },
          })}
        />

        <ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
        <MailIcon />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="nickname">닉네임</Label>
        <StyledInput
          color="green"
          autoComplete="off"
          type="text"
          placeholder="닉네임"
          style={{ borderColor: errors.nickname && 'red' }}
          {...register('nickname', {
            required: { value: true, message: '닉네임을 입력해주세요' },
            minLength: { value: 2, message: '최소 2글자 이상입니다.' },
            maxLength: { value: 10, message: '최대 10글자 이하입니다.' },
            pattern: {
              value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
              message: '영어,한글,숫자를 조합할 수 있습니다.',
            },
          })}
        />
        <ErrorMessage>{errors.nickname && errors.nickname.message}</ErrorMessage>
        <UserIcon />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="pw">비밀번호</Label>

        <StyledInput
          color="green"
          autoComplete="off"
          type={hidePw ? 'password' : 'text'}
          placeholder="비밀번호"
          style={{ borderColor: errors.pw && 'red' }}
          {...register('pw', {
            required: { value: true, message: '비밀번호를 입력해주세요' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
              message: '영문,숫자.특수문자 조합하여 8자리 이상',
            },
          })}
        />
        <ErrorMessage>{errors.pw && errors.pw.message}</ErrorMessage>
        {hidePw ? <ShowPwIcon onClick={() => setHidePw(false)} /> : <HidePwIcon onClick={() => setHidePw(true)} />}
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="confirmPw">비밀번호 확인</Label>
        <StyledInput
          color="green"
          autoComplete="off"
          type={hideConfirmPw ? 'password' : 'text'}
          placeholder="비밀번호 확인"
          style={{ borderColor: errors.confirmPw && 'red' }}
          {...register('confirmPw', {
            required: { value: true, message: '비밀번호를 확인해주세요' },
            validate: (value) => value === watch('pw'),
          })}
        />
        {errors.confirmPw && errors.confirmPw.type === 'required' && (
          <ErrorMessage>{errors.confirmPw.message}</ErrorMessage>
        )}
        {errors.confirmPw && errors.confirmPw.type === 'validate' && (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}
        {hideConfirmPw ? (
          <ShowPwIcon onClick={() => setHideConfirmPw(false)} />
        ) : (
          <HidePwIcon onClick={() => setHideConfirmPw(true)} />
        )}
      </InputWrapper>

      <SubmitButton type="submit" color="green" size="medium">
        회원가입
      </SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  width: 32rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.white};
  align-items: center;
  margin: 0 auto;
  gap: 3rem;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const Title = styled.h1``;
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  align-self: flex-start;
`;

const Label = styled.label`
  font-size: 1.5rem;
  align-self: flex-start;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.red};
  position: absolute;
`;

const UserIcon = styled(AiOutlineUser)`
  top: 2.5rem;
  right: 1.5rem;
  font-size: 2rem;
  position: absolute;
`;
const MailIcon = styled(AiOutlineMail)`
  position: absolute;
  font-size: 2rem;
  top: 2.5rem;
  right: 1.5rem;
`;
const ShowPwIcon = styled(AiOutlineEye)`
  position: absolute;
  font-size: 2rem;
  top: 2.5rem;
  right: 1.5rem;
`;
const HidePwIcon = styled(AiOutlineEyeInvisible)`
  position: absolute;
  font-size: 2rem;
  top: 2.5rem;
  right: 1.5rem;
`;

const SubmitButton = styled(StyledButton)`
  width: 100%;
`;

export default SignUp;
