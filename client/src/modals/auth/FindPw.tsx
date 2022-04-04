import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthInputsType, EmailInput } from '@src/components/AuthInputs';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import Button from '@src/components/Button';
import { findPw } from '@src/store/requests/auth.request';

function FindPw() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputsType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthInputsType> = async (data) => {
    try {
      const res = await dispatch(findPw(data)).unwrap();
      alert(res.message);
      await dispatch(closeModal());
      navigate('/');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
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
  );
}

const Form = styled.form`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const Title = styled.h2``;
const Content = styled.p`
  font-size: 1.5rem;
`;
const SubmitButton = styled(Button)`
  width: 100%;
`;

export default FindPw;
