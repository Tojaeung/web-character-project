import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { greenButtonStyle } from 'styles/button.style';
import { useAppDispatch } from 'store/app/hook';
import { resetPw } from 'store/requests/user.request';
import { greenInputStyle } from 'styles/input.style';
import Logo from 'assets/images/logo.svg';

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
      <img width="200" src={Logo} alt="로고" />
      <Content>변경할 비밀번호를 입력해주세요. 🔐</Content>

      <InputBox>
        <Input
          type={hidePw ? 'password' : 'text'}
          placeholder="새 비밀번호"
          autoComplete="off"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        {hidePw ? <ShowPwIcon onClick={(e) => setHidePw(false)} /> : <HidePwIcon onClick={(e) => setHidePw(true)} />}
      </InputBox>

      <InputBox>
        <Input
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

      <SubmitButton type="submit">비밀번호 변경</SubmitButton>
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

const Content = styled.p`
  align-self: flex-start;
  font-size: 1.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.3rem;
  }
`;
const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Input = styled.input`
  ${greenInputStyle};
`;

const ShowPwIcon = styled(AiOutlineEye)`
  cursor: pointer;
  position: absolute;
  font-size: 2rem;
  top: 1rem;
  right: 1.5rem;
`;
const HidePwIcon = styled(AiOutlineEyeInvisible)`
  cursor: pointer;
  position: absolute;
  font-size: 2rem;
  top: 1rem;
  right: 1.5rem;
`;

const SubmitButton = styled.button`
  ${greenButtonStyle};
  width: 100%;
  padding: 1rem 0;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;

export default ResetPw;
