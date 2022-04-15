import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '@src/components/Button';
import { useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  userId: number;
  desc: string;
}

function Desc({ isOpen, closeModal, userId, desc }: IProps) {
  const navigate = useNavigate();

  const user = useAppSelector(selectAuthUser);

  if (!isOpen) return null;
  return createPortal(
    <Container>
      <Background onClick={closeModal} />
      <ModalBox>
        <CloseIcon onClick={closeModal} />
        <Title>자기소개🌟</Title>
        <Content dangerouslySetInnerHTML={{ __html: desc as string }} />

        {user?.id === userId && (
          <ModifyButton
            color="green"
            size="medium"
            onClick={(e) => {
              navigate('/settings/desc');
              closeModal();
            }}
          >
            수정
          </ModifyButton>
        )}
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
  width: 40rem;
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
const Title = styled.h1`
  align-self: flex-start;
  font-size: 2rem;
  font-weight: bold;
`;

const Content = styled.p`
  align-self: flex-start;
  padding: 1rem;
`;
const ModifyButton = styled(Button)``;
export default Desc;
