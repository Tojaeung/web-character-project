import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from '@src/components/Button';
import { useNavigate } from 'react-router-dom';
import { openModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import { signUp } from '@src/store/requests/auth.request';
import { EmailInput, NicknameInput, PwInput, ConfirmPwInput, AuthInputsType } from '@src/components/AuthInputs';

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthInputsType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthInputsType> = async (data) => {
    try {
      await dispatch(signUp(data)).unwrap();
      await dispatch(openModal({ mode: 'signUpGuideModal' }));
      navigate('/');
    } catch (err: any) {
      alert(err.message);
    }
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
const SubmitButton = styled(Button)`
  width: 80%;
`;

export default SignUp;
