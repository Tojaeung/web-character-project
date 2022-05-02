import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Button from '@src/components/Button';
import { useAppDispatch } from '@src/store/app/hook';
import { resetPw } from '@src/store/requests/user.request';
import Input from '@src/components/Input';

function ResetPw() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const [pw, setPw] = useState('');
  const [pwConfirmation, setPwConfirmation] = useState('');
  const [hidePw, setHidePw] = useState(true);
  const [hidePwConfirmation, setHidePwConfirmation] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchParams.get('pwToken');
    try {
      const res = await dispatch(
        resetPw({ updatedPw: pw, updatedPwConfirmation: pwConfirmation, pwToken: query as string })
      ).unwrap();
      alert(res.message);
      navigate('/');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Logo>기업로고</Logo>
      <Content>변경할 비밀번호를 입력해주세요. 🔐</Content>

      <InputBox>
        <Label htmlFor="pw">새 비밀번호</Label>
        <Input
          color="green"
          type={hidePw ? 'password' : 'text'}
          placeholder="새 비밀번호"
          autoComplete="off"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        {hidePw ? <ShowPwIcon onClick={(e) => setHidePw(false)} /> : <HidePwIcon onClick={(e) => setHidePw(true)} />}
      </InputBox>

      <InputBox>
        <Label htmlFor="pwConfirmation">비밀번호 확인</Label>
        <Input
          color="green"
          type={hidePwConfirmation ? 'password' : 'text'}
          placeholder="새 비밀번호 확인"
          autoComplete="off"
          value={pwConfirmation}
          onChange={(e) => setPwConfirmation(e.target.value)}
        />
        {hidePwConfirmation ? (
          <ShowPwIcon onClick={(e) => setHidePwConfirmation(false)} />
        ) : (
          <HidePwIcon onClick={(e) => setHidePwConfirmation(true)} />
        )}
      </InputBox>

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
  width: 100%;
`;

export default ResetPw;
