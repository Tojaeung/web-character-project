import axios from 'axios';
import qs from 'qs';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import StyledInput from '@src/styles/StyledInput';
import StyledButton from '@src/styles/StyledButton';

interface IFormInputType {
  pw: string;
  confirmPw?: string;
}

function EditPw() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInputType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInputType> = async (data) => {
    delete data.confirmPw;
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

      <InputWrapper>
        <Label>새 비밀번호</Label>
        <StyledInput
          color="green"
          type="password"
          placeholder="비밀번호"
          {...register('pw', {
            required: { value: true, message: '비밀번호를 입력해주세요' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
              message: '영문,숫자.특수문자 조합하여 8자리 이상',
            },
          })}
        />
        <ErrorMessage>{errors.pw && errors.pw.message}</ErrorMessage>
      </InputWrapper>

      <InputWrapper>
        <Label>새 비밀번호 확인</Label>
        <StyledInput
          color="green"
          type="password"
          placeholder="비밀번호 확인"
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
      </InputWrapper>

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
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.4rem;
`;
const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.red};
`;
const SubmitButton = styled(StyledButton)`
  width: 100%;
`;

export default EditPw;
