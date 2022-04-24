import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { AiOutlineUser, AiOutlineEye, AiOutlineMail, AiOutlineEyeInvisible } from 'react-icons/ai';
import Button from '@src/components/Button';
import { useNavigate } from 'react-router-dom';
import { openModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import { signUp } from '@src/store/requests/user.request';

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [hidePw, setHidePw] = useState(true);
  const [hideConfirmPw, setHideConfirmPw] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{ email: string; nickname: string; pw: string; pwConfirmation: string }>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<{ email: string; nickname: string; pw: string; pwConfirmation: string }> = async (
    data
  ) => {
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

      <InputBox>
        <Label htmlFor="email">이메일</Label>
        <Input
          type="text"
          placeholder="이메일 (email@xxxxx.com)"
          autoComplete="off"
          style={{ borderColor: errors.email && 'red' }}
          {...register('email', {
            required: { value: true, message: '이메일 입력해주세요.' },
            pattern: {
              value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
              message: '이메일 형식이 아닙니다.',
            },
          })}
        />
        <ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
        <MailIcon />
      </InputBox>

      <InputBox>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          type="text"
          placeholder="닉네임"
          autoComplete="off"
          style={{ borderColor: errors.nickname && 'red' }}
          {...register('nickname', {
            required: { value: true, message: '닉네임을 입력해주세요' },
            minLength: { value: 2, message: '최소 2글자 이상입니다.' },
            maxLength: { value: 10, message: '최대 10글자 이하입니다.' },
            pattern: {
              value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
              message: '영어,한글,숫자를 조합할 수 있습니다.',
            },
          })}
        />
        <ErrorMessage>{errors.nickname && errors.nickname.message}</ErrorMessage>
        <UserIcon />
      </InputBox>

      <InputBox>
        <Label htmlFor="pw">비밀번호</Label>
        <Input
          autoComplete="off"
          type={hidePw ? 'password' : 'text'}
          placeholder="비밀번호"
          style={{ borderColor: errors.pw && 'red' }}
          {...register('pw', {
            required: { value: true, message: '비밀번호를 입력해주세요' },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
              message: '영문,숫자.특수문자 조합하여 8자리 이상',
            },
          })}
        />
        <ErrorMessage>{errors.pw && errors.pw.message}</ErrorMessage>
        {hidePw ? <ShowPwIcon onClick={(e) => setHidePw(false)} /> : <HidePwIcon onClick={(e) => setHidePw(true)} />}
      </InputBox>

      <InputBox>
        <Label htmlFor="pwConfirmation">비밀번호 확인</Label>
        <Input
          autoComplete="off"
          type={hideConfirmPw ? 'password' : 'text'}
          placeholder="비밀번호 확인"
          style={{ borderColor: errors.pwConfirmation && 'red' }}
          {...register('pwConfirmation', {
            required: { value: true, message: '비밀번호를 확인해주세요' },
            validate: (value) => value === watch('pw'),
          })}
        />
        {errors.pwConfirmation && errors.pwConfirmation.type === 'required' && (
          <ErrorMessage>{errors.pwConfirmation.message}</ErrorMessage>
        )}
        {errors.pwConfirmation && errors.pwConfirmation.type === 'validate' && (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}
        {hideConfirmPw ? (
          <ShowPwIcon onClick={(e) => setHideConfirmPw(false)} />
        ) : (
          <HidePwIcon onClick={(e) => setHideConfirmPw(true)} />
        )}
      </InputBox>

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
const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const Label = styled.label`
  font-size: 1.5rem;
  align-self: flex-start;
  white-space: nowrap;
`;
const Input = styled.input`
  padding: 0 4rem 0 1rem;
  border-radius: 5px;
  width: 100%;
  min-height: 4rem;
  font-size: 1.4rem;
  letter-spacing: 0.15rem;
  outline: none;
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  &:focus {
    border: 1px solid ${({ theme }) => theme.palette.green};
  }
  &::placeholder {
    font-size: 1.4rem;
  }
`;
const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.red};
  position: absolute;
  bottom: -1.5rem;
  left: 0;
`;
const MailIcon = styled(AiOutlineMail)`
  position: absolute;
  font-size: 2rem;
  top: 3.5rem;
  right: 1.5rem;
`;
const UserIcon = styled(AiOutlineUser)`
  top: 3.5rem;
  right: 1.5rem;
  font-size: 2rem;
  position: absolute;
`;
const ShowPwIcon = styled(AiOutlineEye)`
  position: absolute;
  font-size: 2rem;
  top: 3.5rem;
  right: 1.5rem;
`;
const HidePwIcon = styled(AiOutlineEyeInvisible)`
  position: absolute;
  font-size: 2rem;
  top: 3.5rem;
  right: 1.5rem;
`;

const SubmitButton = styled(Button)`
  width: 80%;
`;

export default SignUp;
