import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';
import StyledButton from '@src/styles/StyledButton';

import { openModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';

import { AuthFormTypes } from '@src/types';
import { EmailInput, NicknameInput, PwInput, ConfirmPwInput } from '@src/components/react-hook-form/AuthForm';

function SignUp() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormTypes>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthFormTypes> = async (data) => {
    const response = await axios.post('/api/auth/signUp', data);
    const { ok, message } = response.data;
    if (!ok) return alert(message);
    await dispatch(openModal({ mode: 'signUpGuideModal' }));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>회원가입📃</Title>

      <EmailInput label="이메일" name="email" register={register} error={errors.email} />

      <NicknameInput label="닉네임" name="nickname" register={register} error={errors.nickname} />

      <PwInput label="비밀번호" name="pw" register={register} error={errors.pw} />

      <ConfirmPwInput
        label="비밀번호 확인"
        name="confirmPw"
        register={register}
        error={errors.confirmPw}
        watch={watch('pw')}
      />

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
  align-items: center;
  margin: 0 auto;
  gap: 3rem;
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

const Title = styled.h1``;
const SubmitButton = styled(StyledButton)`
  width: 80%;
`;

export default SignUp;
