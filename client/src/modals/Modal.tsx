import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectModalIsOpen, selectModalMode, closeModal } from '@src/store/slices/modal.slice';
import { AiOutlineClose } from 'react-icons/ai';
import Login from '@src/modals/user/Login';
import DeleteAccount from '@src/modals/settings/DeleteAccount';
import ExitChat from '@src/modals/chat/ExitChat';
import SignUpGuide from '@src/modals/user/SignUpGuide';
import ForgotPw from '@src/modals/user/ForgotPw';
import ChangeEmail from '@src/modals/settings/ChangeEmail';
import ChangeNickname from '@src/modals/settings/ChangeNickname';
import ChangePw from '@src/modals/settings/ChangePw';

function Modal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectModalIsOpen);
  const mode = useAppSelector(selectModalMode);

  if (!isOpen) return null;
  return createPortal(
    <Container>
      <Background onClick={(e) => dispatch(closeModal())} />
      {!isOpen && !mode ? null : (
        <ModalBox>
          <CloseIcon onClick={(e) => dispatch(closeModal())} />
          {isOpen && mode === 'login' && <Login />}
          {isOpen && mode === 'deleteAccount' && <DeleteAccount />}
          {isOpen && mode === 'exitChat' && <ExitChat />}
          {isOpen && mode === 'signUpGuide' && <SignUpGuide />}
          {isOpen && mode === 'forgotPw' && <ForgotPw />}
          {isOpen && mode === 'changeEmail' && <ChangeEmail />}
          {isOpen && mode === 'changeNickname' && <ChangeNickname />}
          {isOpen && mode === 'changePw' && <ChangePw />}
        </ModalBox>
      )}
      ))
    </Container>,
    document.getElementById('modalPortal') as HTMLElement
  );
}
const Container = styled.div`
  /* z-index: 1030; */
`;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
`;
const ModalBox = styled.div`
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
  z-index: 1031;
`;
const CloseIcon = styled(AiOutlineClose)`
  font-size: 2.5rem;
  align-self: flex-end;
  cursor: pointer;
`;

export default Modal;
