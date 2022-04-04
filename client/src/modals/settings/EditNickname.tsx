import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import { NicknameInput, AuthInputsType } from '@src/components/AuthInputs';
import Button from '@src/components/Button';
import { editNickname } from '@src/store/requests/settings.request';

function EditNickname() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputsType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthInputsType> = async (data) => {
    try {
      const res = await dispatch(editNickname({ nickname: data.nickname! })).unwrap();
      alert(res.message);
      await dispatch(closeModal());
      navigate(0);
    } catch (err: any) {
      alert(err.message);
    }
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

export default EditNickname;
