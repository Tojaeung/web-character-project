import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@src/components/Input';
import { redButtonStyle } from '@src/styles/button.style';
import { useAppDispatch } from '@src/store/app/hook';
import { penaltyByAdmin } from '@src/store/requests/etc.request';
import { closeModal } from '@src/store/slices/modal.slice';

interface IProp {
  props: { userId: number };
}

function Penalty({ props }: IProp) {
  const dispatch = useAppDispatch();
  const [penaltyPeriod, setPenaltyPeriod] = useState('');

  const handelPanelty = async (e: React.MouseEvent<HTMLButtonElement>) => {
    closeModal();
    setPenaltyPeriod('');
    try {
      const res = await dispatch(
        penaltyByAdmin({ userId: props.userId as number, penaltyPeriod: Number(penaltyPeriod) })
      ).unwrap();
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <Title>불량유저 제재하기</Title>
      <Input
        type="number"
        placeholder="몇일동안 제재를 할까요??"
        value={penaltyPeriod}
        onChange={(e) => setPenaltyPeriod(e.target.value)}
      />
      <SubmitButton onClick={handelPanelty}>제재하기</SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  width: 35rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    width: 25rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

const SubmitButton = styled.button`
  ${redButtonStyle};
  width: 100%;
  padding: 1rem;
`;

export default Penalty;
