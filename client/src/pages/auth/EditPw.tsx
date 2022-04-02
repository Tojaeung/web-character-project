import axios from 'axios';
import qs from 'qs';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@src/components/Button';
import { AuthFormTypes } from '@src/types';
import { PwInput, ConfirmPwInput } from '@src/components/react-hook-form/AuthForm';

function EditPw() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormTypes>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthFormTypes> = async (data) => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const res = await axios.post('/api/auth/editPw', { pw: data.pw, pwToken: query.pwToken });
    const { ok, message } = res.data;
    if (ok!) return alert(message);
    alert(message);
    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Logo>기업로고</Logo>
      <Content>변경할 비밀번호를 입력해주세요. 🔐</Content>

      <PwInput label="비밀번호" name="pw" register={register} error={errors.pw} />

      <ConfirmPwInput
        label="비밀번호 확인"
        name="confirmPw"
        register={register}
        error={errors.confirmPw}
        watch={watch('pw')}
      />

      <SubmitButton type="submit" color="green" size="medium">
        비밀번호 변경
      </SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  width: 32rem;
  border-radius: 5px;
  padding: 2rem;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const Logo = styled.span`
  font-size: 3rem;
`;
const Content = styled.p`
  align-self: flex-start;
  font-size: 1.8rem;
  line-height: 2rem;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

export default EditPw;
