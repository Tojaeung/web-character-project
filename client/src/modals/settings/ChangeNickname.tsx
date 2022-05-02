import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';
import { closeModal } from '@src/store/slices/modal.slice';
import { useAppDispatch } from '@src/store/app/hook';
import Input from '@src/components/Input';
import Button from '@src/components/Button';
import { updateNickname } from '@src/store/requests/user.request';

function ChangeNickname() {
  const dispatch = useAppDispatch();

  const [nickname, setNickname] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          color="green"
          type="text"
          placeholder="닉네임"
          autoComplete="off"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <UserIcon />
      </InputBox>

      <SubmitButton type="submit" color="green" size="medium">
        닉네임 변경하기
      </SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  width: 32rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const Title = styled.h1`
  align-self: flex-start;
`;
const Content = styled.p`
  font-size: 1.5rem;
`;
const InputBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const UserIcon = styled(AiOutlineUser)`
  position: absolute;
  font-size: 2rem;
  top: 3.5rem;
  right: 1.5rem;
`;

const SubmitButton = styled(Button)``;

export default ChangeNickname;
