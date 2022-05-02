import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@src/components/Input';
import Button from '@src/components/Button';
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
      <Input
        type="number"
        placeholder="몇일동안 제재를 할까요??"
        value={penaltyPeriod}
        onChange={(e) => setPenaltyPeriod(e.target.value)}
      />
      <SubmitButton color="red" size="small" onClick={handelPanelty}>
        제재하기
      </SubmitButton>
    </Container>
  );
}

const Container = styled.div``;

const SubmitButton = styled(Button)`
  padding: 1rem;
`;

export default Penalty;
