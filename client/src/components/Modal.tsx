import React from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

interface IProps {
  type?: 'default' | 'self-made';
  size?: 'small' | 'medium' | 'large';
  openModal: boolean;
  modalToggle: () => void;
  children: React.ReactNode;
}

function Modal({ type = 'default', size = 'small', openModal, modalToggle, children }: IProps) {
  if (!openModal) return null;
  else if (openModal && type === 'default') {
    return createPortal(
      <Container>
        <Background onClick={modalToggle} />
        <ModalBox size={size}>
          <CloseIcon onClick={modalToggle} />
          {children}
        </ModalBox>
      </Container>,
      document.getElementById('portal') as HTMLElement
    );
  } else if (openModal && type === 'self-made') {
    return createPortal(
      <Container>
        <Background onClick={modalToggle} />
        {children}
      </Container>,
      document.getElementById('portal') as HTMLElement
    );
  } else {
    return null;
  }
}

Modal.defaultProps = {
  type: '',
};

const Container = styled.div``;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;
const ModalBox = styled.div<{ size: string }>`
  ${({ size }) => {
    if (size === 'small') {
      return css`
        width: 32rem;
        max-width: 32rem;
      `;
    } else if (size === 'medium') {
      return css`
        width: 40rem;
        max-width: 40rem;
      `;
    } else if (size === 'large') {
      return css`
        width: 50rem;
        max-width: 50rem;
      `;
    }
  }}
  border-radius: 5px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 1000;
  @media screen and (max-width: 520px) {
    ${({ size }) => {
      if (size === 'large') {
        return css`
          width: 90%;
        `;
      }
    }}
  }
  @media screen and (max-width: 420px) {
    ${({ size }) => {
      if (size === 'medium') {
        return css`
          width: 90%;
        `;
      }
    }}
  }
  @media screen and (max-width: 340px) {
    ${({ size }) => {
      if (size === 'small') {
        return css`
          width: 90%;
        `;
      }
    }}
  }
`;
const CloseIcon = styled(AiOutlineClose)``;

export default Modal;
