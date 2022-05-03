import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectModalIsOpen, selectModalModal, closeModal, selectModalProps } from '@src/store/slices/modal.slice';
import { AiOutlineClose } from 'react-icons/ai';
// user 모달
import Login from '@src/components/modals/Login';
import SignUpGuide from '@src/components/modals/SignUpGuide';
import ForgotPw from '@src/components/modals/ForgotPw';

// 채팅 모달
import ExitChat from '@src/components/modals/ExitChat';

// settings 모달
import ChangeEmail from '@src/components/modals/ChangeEmail';
import ChangeNickname from '@src/components/modals/ChangeNickname';
import ChangePw from '@src/components/modals/ChangePw';
import Desc from '@src/components/modals/Desc';
import DeleteAccount from '@src/components/modals/DeleteAccount';

// 그림 모달
import Drawing from '@src/components/modals/drawing';

// 기타 등등 모달
import Penalty from '@src/components/modals/Penalty';
import Report from '@src/components/modals/Report';
import UserInfo from '@src/components/modals/UserInfo';

function Modal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectModalIsOpen);
  const modal = useAppSelector(selectModalModal);
  const props = useAppSelector(selectModalProps);

  if (!isOpen) return null;
  return createPortal(
    <Container>
      <Background onClick={(e) => dispatch(closeModal())} />
      <ModalBox>
        <CloseIcon onClick={(e) => dispatch(closeModal())} />
        {isOpen && modal === 'login' && <Login />}
        {isOpen && modal === 'deleteAccount' && <DeleteAccount />}
        {isOpen && modal === 'exitChat' && <ExitChat />}
        {isOpen && modal === 'signUpGuide' && <SignUpGuide />}
        {isOpen && modal === 'forgotPw' && <ForgotPw />}
        {isOpen && modal === 'changeEmail' && <ChangeEmail />}
        {isOpen && modal === 'changeNickname' && <ChangeNickname />}
        {isOpen && modal === 'changePw' && <ChangePw />}
        {isOpen && modal === 'drawing' && <Drawing />}

        {isOpen && modal === 'desc' && <Desc props={props} />}
        {isOpen && modal === 'penalty' && <Penalty props={props} />}
        {isOpen && modal === 'report' && <Report props={props} />}
        {isOpen && modal === 'userInfo' && <UserInfo props={props} />}
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
  z-index: 2;
`;
const ModalBox = styled.div`
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 4rem 1.5rem 1.5rem 1.5rem;
  background-color: ${({ theme }) => theme.palette.bgColor};
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  z-index: 1031;
`;
const CloseIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  font-size: 2.5rem;
  cursor: pointer;
`;

export default Modal;
