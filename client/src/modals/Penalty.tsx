import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import Input from '@src/components/Input';
import Button from '@src/components/Button';
import { useAppDispatch } from '@src/store/app/hook';
import { penaltyByAdmin } from '@src/store/requests/etc.request';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  userId: number;
}

function Penalty({ isOpen, closeModal, userId }: IProps) {
  const dispatch = useAppDispatch();
  const [penaltyPeriod, setPenaltyPeriod] = useState('');

  const handelPanelty = async (e: React.MouseEvent<HTMLButtonElement>) => {
    closeModal();
    setPenaltyPeriod('');
    try {
      const res = await dispatch(
        penaltyByAdmin({ userId: userId as number, penaltyPeriod: Number(penaltyPeriod) })
      ).unwrap();
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!isOpen) return null;
  return createPortal(
    <Container>
      <Background onClick={closeModal} />
      <ModalBox>
        <CloseIcon onClick={closeModal} />
        <Input
          type="number"
          placeholder="몇일동안 제재를 할까요??"
          value={penaltyPeriod}
          onChange={(e) => setPenaltyPeriod(e.target.value)}
        />
        <SubmitButton color="red" size="small" onClick={handelPanelty}>
          제재하기
        </SubmitButton>
      </ModalBox>
    </Container>,
    document.getElementById('modalPortal') as HTMLElement
  );
}

const Container = styled.div``;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1050;
`;
const ModalBox = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 1050;
  gap: 1.5rem;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 2.5rem;
  align-self: flex-end;
`;

const SubmitButton = styled(Button)`
  padding: 1rem;
`;

export default Penalty;
