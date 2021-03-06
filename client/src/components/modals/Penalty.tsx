import React, { useState } from 'react';
import styled from 'styled-components';
import { defaultInputStyle } from 'styles/input.style';
import { redButtonStyle } from 'styles/button.style';
import { useAppDispatch } from 'store/app/hook';
import { givePenalty } from 'store/requests/user.request';
import { closeModal } from 'store/slices/modal.slice';
import socket from 'utils/socket';

interface IProp {
  props: { userId: number } | null;
}

function Penalty({ props }: IProp) {
  const { userId } = props!;

  const dispatch = useAppDispatch();
  const [penaltyPeriod, setPenaltyPeriod] = useState('');

  const handelPanelty = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(closeModal());
    setPenaltyPeriod('');
    try {
      const res = await dispatch(givePenalty({ userId, penaltyPeriod: Number(penaltyPeriod) })).unwrap();
      alert(res.message);
      setPenaltyPeriod('');

      // 제재조치된 유저에게 경고 알림 보내기
      const penaltyNotiObj = { type: 'penalty', userId, penaltyPeriod };
      await socket.emit('addPenaltyNoti', penaltyNotiObj);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <Title>불량유저 제재하기</Title>
      <Content>몇일동안 제재를 할까요??</Content>
      <Input
        type="number"
        placeholder="예) 3일 ---> 3"
        value={penaltyPeriod}
        onChange={(e) => setPenaltyPeriod(e.target.value)}
      />
      <SubmitButton onClick={handelPanelty}>제재하기</SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media ${({ theme }) => theme.device.mobile} {
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
  }
`;

const Content = styled.p`
  font-size: 1.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;

const Input = styled.input`
  ${defaultInputStyle};
`;

const SubmitButton = styled.button`
  align-self: center;
  ${redButtonStyle};
  padding: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.5rem;
    font-size: 1.2rem;
  }
`;

export default Penalty;
