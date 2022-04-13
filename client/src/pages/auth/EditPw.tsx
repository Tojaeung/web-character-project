import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@src/components/Button';
import { useAppDispatch } from '@src/store/app/hook';
import { AuthInputsType, PwInput, ConfirmPwInput } from '@src/components/AuthInputs';
import { editPw } from '@src/store/requests/auth.request';

function EditPw() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthInputsType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<AuthInputsType> = async (data) => {
    const query = searchParams.get('pwToken');

    try {
      const res = await dispatch(editPw({ pw: data.pw!, pwToken: query as string })).unwrap();
      alert(res.message);
      navigate('/');
    } catch (err: any) {
      alert(err.message);
    }
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
