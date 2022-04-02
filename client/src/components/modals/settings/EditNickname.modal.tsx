import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import { refreshLogin } from '@src/store/requests/auth.request';
import { NicknameInput } from '@src/components/react-hook-form/AuthForm';
import { AuthFormTypes } from '@src/types';
import Button from '@src/components/Button';

function EditNicknameModal() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormTypes>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthFormTypes> = async (data) => {
    const res = await axios.post(
      '/api/settings/account/editNickname',
      { nickname: data.nickname },
      { withCredentials: true }
    );
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    await dispatch(closeModal());
    await dispatch(refreshLogin());
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>닉네임 변경</Title>
      <Content>변경할 닉네임을 입력해주세요.😮😮</Content>
      <NicknameInput label="닉네임" name="nickname" register={register} error={errors.nickname} />

      <SubmitButton type="submit" color="green" size="medium">
        닉네임 변경하기
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
const SubmitButton = styled(Button)``;

export default EditNicknameModal;
