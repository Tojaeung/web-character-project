import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logoutUser } from '@src/store/requests/auth.request';
import { useAppDispatch } from '@src/store/app/hook';
import { PwInput, ConfirmPwInput } from '@src/components/react-hook-form/AuthForm';
import { AuthFormTypes } from '@src/types';
import StyledButton from '@src/styles/StyledButton';

function AccountPw() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormTypes>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthFormTypes> = async (data) => {
    const res = await axios.post(
      '/api/settings/account/editPw',
      { currentPw: data.currentPw, newPw: data.pw },
      { withCredentials: true }
    );
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    await dispatch(logoutUser());
    navigate(0);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>비밀번호 변경</Title>

      <Content>변경할 비밀번호를 입력해주세요 🔒🔒</Content>

      <PwInput label="현재 비밀번호" name="currentPw" register={register} error={errors.currentPw} />
      <PwInput label="변경할 비밀번호" name="pw" register={register} error={errors.pw} />
      <ConfirmPwInput label="비밀번호 확인" name="confirmPw" register={register} error={errors.confirmPw} />

      <SubmitButton type="submit" color="green" size="medium">
        비밀번호 변경하기
      </SubmitButton>
    </Form>
  );
}
const Form = styled.form`
  width: 32rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const Title = styled.h1`
  align-self: flex-start;
`;
const Content = styled.p`
  font-size: 1.5rem;
`;
const SubmitButton = styled(StyledButton)``;

export default AccountPw;
