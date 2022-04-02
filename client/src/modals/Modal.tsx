import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectModalIsOpen, selectModalMode, closeModal } from '@src/store/slices/modal.slice';
import { AiOutlineClose } from 'react-icons/ai';
import LoginModal from '@src/modals/auth/Login.modal';
import DelAccountModal from '@src/modals/settings/DelAccount.modal';
import ExitChatModal from '@src/modals/chat/ExitChat.modal';
import SignUpGuideModal from '@src/modals/auth/SignUpGuideModal';
import FindPw from '@src/modals/auth/FindPw';
import EditEmailModal from '@src/modals/settings/EditEmail.modal';
import EditNicknameModal from '@src/modals/settings/EditNickname.modal';
import EditPwModal from '@src/modals/settings/EditPw.modal';
import SearchModal from '@src/modals/search/Search.modal';
import ShowDescModal from '@src/modals/profile/ShowDesc.modal';
import ShowDrawingModal from '@src/modals/profile/ShowDrawing.modal';

function Modal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectModalIsOpen);
  const mode = useAppSelector(selectModalMode);

  if (!isOpen) return null;
  return createPortal(
    <Container>
      <Background onClick={(e) => dispatch(closeModal())} />
      {!isOpen && !mode && null}
      {isOpen && mode === 'showDrawingModal' && <ShowDrawingModal />}
      {isOpen && mode === 'search' && <SearchModal />}
      {isOpen && (mode !== 'showDrawingModal' || 'search') && (
        <ModalBox>
          <CloseIcon onClick={(e) => dispatch(closeModal())} />
          {isOpen && mode === 'login' && <LoginModal />}
          {isOpen && mode === 'delAccount' && <DelAccountModal />}
          {isOpen && mode === 'exitChat' && <ExitChatModal />}
          {isOpen && mode === 'signUpGuideModal' && <SignUpGuideModal />}
          {isOpen && mode === 'findPw' && <FindPw />}
          {isOpen && mode === 'editEmail' && <EditEmailModal />}
          {isOpen && mode === 'editNickname' && <EditNicknameModal />}
          {isOpen && mode === 'editPw' && <EditPwModal />}
          {isOpen && mode === 'showDesc' && <ShowDescModal />}
        </ModalBox>
      )}
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
  z-index: 1000;
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
  z-index: 1000;
`;
const CloseIcon = styled(AiOutlineClose)`
  font-size: 2.5rem;
  align-self: flex-end;
  cursor: pointer;
`;

export default Modal;
