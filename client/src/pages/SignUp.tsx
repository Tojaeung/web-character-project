import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { AiOutlineUser, AiOutlineEye, AiOutlineMail, AiOutlineEyeInvisible } from 'react-icons/ai';
import { greenInputStyle } from 'styles/input.style';
import { greenButtonStyle } from 'styles/button.style';
import { useNavigate } from 'react-router-dom';
import { openModal } from 'store/slices/modal.slice';
import { useAppDispatch } from 'store/app/hook';
import { signUp } from 'store/requests/user.request';

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
      await dispatch(openModal({ modal: 'signUpGuide' }));
      navigate('/');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>íìê°ìð</Title>

      <InputBox>
        <Label htmlFor="email">ì´ë©ì¼</Label>
        <Input
          type="text"
          placeholder="ì´ë©ì¼ (íê¸¸ëxxxxx.com)"
          autoComplete="off"
          style={{ borderColor: errors.email && 'red' }}
          {...register('email', {
            required: { value: true, message: 'ì´ë©ì¼ ìë ¥í´ì£¼ì¸ì.' },
            pattern: {
              value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'ì´ë©ì¼ íìì´ ìëëë¤.',
            },
          })}
        />
        <ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
        <MailIcon />
      </InputBox>

      <InputBox>
        <Label htmlFor="nickname">ëë¤ì</Label>
        <Input
          type="text"
          placeholder="ëë¤ì"
          autoComplete="off"
          style={{ borderColor: errors.nickname && 'red' }}
          {...register('nickname', {
            required: { value: true, message: 'ëë¤ìì ìë ¥í´ì£¼ì¸ì' },
            minLength: { value: 2, message: 'ìµì 2ê¸ì ì´ììëë¤.' },
            maxLength: { value: 10, message: 'ìµë 10ê¸ì ì´íìëë¤.' },
            pattern: {
              value: /^[ã±-ã|ê°-í£|a-z|A-Z|0-9|]+$/,
              message: 'ìì´,íê¸,ì«ìë¥¼ ì¡°í©í  ì ììµëë¤.',
            },
          })}
        />
        <ErrorMessage>{errors.nickname && errors.nickname.message}</ErrorMessage>
        <UserIcon />
      </InputBox>

      <InputBox>
        <Label htmlFor="pw">ë¹ë°ë²í¸</Label>
        <Input
          autoComplete="off"
          type={hidePw ? 'password' : 'text'}
          placeholder="ë¹ë°ë²í¸"
          style={{ borderColor: errors.pw && 'red' }}
          {...register('pw', {
            required: { value: true, message: 'ë¹ë°ë²í¸ë¥¼ ìë ¥í´ì£¼ì¸ì' },
            pattern: {
              value: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
              message: 'ìë¬¸,ì«ì.í¹ìë¬¸ì ì¡°í©íì¬ 8ìë¦¬ ì´ì',
            },
          })}
        />
        <ErrorMessage>{errors.pw && errors.pw.message}</ErrorMessage>
        {hidePw ? <ShowPwIcon onClick={(e) => setHidePw(false)} /> : <HidePwIcon onClick={(e) => setHidePw(true)} />}
      </InputBox>

      <InputBox>
        <Label htmlFor="pwConfirmation">ë¹ë°ë²í¸ íì¸</Label>
        <Input
          autoComplete="off"
          type={hideConfirmPw ? 'password' : 'text'}
          placeholder="ë¹ë°ë²í¸ íì¸"
          style={{ borderColor: errors.pwConfirmation && 'red' }}
          {...register('pwConfirmation', {
            required: { value: true, message: 'ë¹ë°ë²í¸ë¥¼ íì¸í´ì£¼ì¸ì' },
            validate: (value) => value === watch('pw'),
          })}
        />
        {errors.pwConfirmation && errors.pwConfirmation.type === 'required' && (
          <ErrorMessage>{errors.pwConfirmation.message}</ErrorMessage>
        )}
        {errors.pwConfirmation && errors.pwConfirmation.type === 'validate' && (
          <ErrorMessage>ë¹ë°ë²í¸ê° ì¼ì¹íì§ ììµëë¤.</ErrorMessage>
        )}
        {hideConfirmPw ? (
          <ShowPwIcon onClick={(e) => setHideConfirmPw(false)} />
        ) : (
          <HidePwIcon onClick={(e) => setHideConfirmPw(true)} />
        )}
      </InputBox>

      <SubmitButton type="submit">íìê°ì</SubmitButton>
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
  gap: 2.5rem;
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;
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
  ${greenInputStyle};
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
  top: 3.7rem;
  right: 1.5rem;
`;
const UserIcon = styled(AiOutlineUser)`
  top: 3.7rem;
  right: 1.5rem;
  font-size: 2rem;
  position: absolute;
`;
const ShowPwIcon = styled(AiOutlineEye)`
  cursor: pointer;
  position: absolute;
  font-size: 2rem;
  top: 3.7rem;
  right: 1.5rem;
`;
const HidePwIcon = styled(AiOutlineEyeInvisible)`
  cursor: pointer;
  position: absolute;
  font-size: 2rem;
  top: 3.7rem;
  right: 1.5rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 0rem;
  ${greenButtonStyle};
`;

export default SignUp;
