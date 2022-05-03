import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import { greenInputStyle } from '@src/styles/input.style';
import { greenButtonStyle } from '@src/styles/button.style';
import { updateNickname } from '@src/store/requests/user.request';

function ChangeNickname() {
  const dispatch = useAppDispatch();

  const [nickname, setNickname] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await dispatch(updateNickname({ updatedNickname: nickname })).unwrap();
      alert(res.message);
      await dispatch(closeModal());
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>닉네임 변경</Title>
      <Content>변경할 닉네임을 입력해주세요.😮😮</Content>
      <InputBox>
        <Input
          type="text"
          placeholder="닉네임"
          autoComplete="off"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <UserIcon />
      </InputBox>

      <SubmitButton type="submit">닉네임 변경하기</SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  width: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  @media ${({ theme }) => theme.device.mobile} {
    width: 25rem;
    gap: 1rem;
  }
`;
const Title = styled.h1`
  align-self: flex-start;
  font-size: 2rem;
  font-weight: 700;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
  }
`;
const Content = styled.p`
  font-size: 1.5rem;
  align-self: flex-start;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
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
const UserIcon = styled(AiOutlineUser)`
  position: absolute;
  font-size: 2rem;
  top: 1rem;
  right: 1.5rem;
`;

const SubmitButton = styled.button`
  ${greenButtonStyle};
  width: 50%;
  padding: 1rem 0;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
    padding: 0.7rem 1rem;
  }
`;

export default ChangeNickname;
