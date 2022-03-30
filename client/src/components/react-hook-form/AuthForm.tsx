import React, { useState } from 'react';
import styled from 'styled-components';
import { Path, UseFormRegister, FieldError } from 'react-hook-form';
import { AiOutlineUser, AiOutlineEye, AiOutlineMail, AiOutlineEyeInvisible } from 'react-icons/ai';
import { AuthFormTypes } from '@src/types';

interface IProps {
  label: string;
  name: Path<AuthFormTypes>;
  register: UseFormRegister<AuthFormTypes>;
  error: FieldError | undefined;
  watch?: string;
}

export const EmailInput = ({ label, name, register, error }: IProps) => {
  return (
    <InputBox>
      <Label htmlFor={label}>{label}</Label>
      <Input
        type="text"
        placeholder="이메일 (email@xxxxx.com)"
        autoComplete="off"
        style={{ borderColor: error && 'red' }}
        {...register(name, {
          required: { value: true, message: '이메일 입력해주세요.' },
          pattern: {
            value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
            message: '이메일 형식이 아닙니다.',
          },
        })}
      />
      <ErrorMessage>{error && error.message}</ErrorMessage>
      <MailIcon />
    </InputBox>
  );
};
export const NicknameInput = ({ label, name, register, error }: IProps) => {
  return (
    <InputBox>
      <Label htmlFor={label}>{label}</Label>
      <Input
        type="text"
        placeholder="닉네임"
        autoComplete="off"
        style={{ borderColor: error && 'red' }}
        {...register(name, {
          required: { value: true, message: '닉네임을 입력해주세요' },
          minLength: { value: 2, message: '최소 2글자 이상입니다.' },
          maxLength: { value: 10, message: '최대 10글자 이하입니다.' },
          pattern: {
            value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
            message: '영어,한글,숫자를 조합할 수 있습니다.',
          },
        })}
      />
      <ErrorMessage>{error && error.message}</ErrorMessage>
      <UserIcon />
    </InputBox>
  );
};
export const PwInput = ({ label, name, register, error }: IProps) => {
  const [hidePw, setHidePw] = useState(true);

  const handleHidePw = (e: React.MouseEvent<SVGElement>) => {
    setHidePw(!hidePw);
  };

  return (
    <InputBox>
      <Label htmlFor={label}>{label}</Label>
      <Input
        autoComplete="off"
        type={hidePw ? 'password' : 'text'}
        placeholder="비밀번호"
        style={{ borderColor: error && 'red' }}
        {...register(name, {
          required: { value: true, message: '비밀번호를 입력해주세요' },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
            message: '영문,숫자.특수문자 조합하여 8자리 이상',
          },
        })}
      />
      <ErrorMessage>{error && error.message}</ErrorMessage>
      {hidePw ? <ShowPwIcon onClick={handleHidePw} /> : <HidePwIcon onClick={handleHidePw} />}
    </InputBox>
  );
};
export const ConfirmPwInput = ({ label, name, register, error, watch }: IProps) => {
  const [hideConfirmPw, setHideConfirmPw] = useState(true);

  const handleHideConfirmPw = (e: React.MouseEvent<SVGElement>) => {
    setHideConfirmPw(!hideConfirmPw);
  };

  return (
    <InputBox>
      <Label htmlFor={label}>{label}</Label>
      <Input
        autoComplete="off"
        type={hideConfirmPw ? 'password' : 'text'}
        placeholder="비밀번호 확인"
        style={{ borderColor: error && 'red' }}
        {...register(name, {
          required: { value: true, message: '비밀번호를 확인해주세요' },
          validate: (value) => value === watch,
        })}
      />
      {error && error.type === 'required' && <ErrorMessage>{error.message}</ErrorMessage>}
      {error && error.type === 'validate' && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
      {hideConfirmPw ? <ShowPwIcon onClick={handleHideConfirmPw} /> : <HidePwIcon onClick={handleHideConfirmPw} />}
    </InputBox>
  );
};

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
