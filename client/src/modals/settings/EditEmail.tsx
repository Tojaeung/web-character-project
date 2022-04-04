import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import { logoutUser } from '@src/store/requests/auth.request';
import { AuthInputsType, EmailInput } from '@src/components/AuthInputs';
import Button from '@src/components/Button';

function EditEmail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputsType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthInputsType> = async (data) => {
    const res = await axios.post('/api/settings/account/editEmail', { email: data.email }, { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    await dispatch(closeModal());
    alert(message);
    await dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>이메일 변경</Title>
      <Content>
        변경할 이메일 주소를 정확하게 입력해주세요.🔍
        <br />
        <i>'인증메일'</i>이 전송됩니다.
      </Content>
      <EmailInput label="이메일" name="email" register={register} error={errors.email} />

      <SubmitButton type="submit" color="green" size="medium">
        인증메일 보내기
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

export default EditEmail;
