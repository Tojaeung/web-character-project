import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'store/app/hook';
import { selectModalIsOpen, selectModalModal, closeModal, selectModalProps } from 'store/slices/modal.slice';
import { AiOutlineClose } from 'react-icons/ai';
// user 모달
import Login from 'components/modals/Login';
import SignUpGuide from 'components/modals/SignUpGuide';
import ForgotPw from 'components/modals/ForgotPw';

// 채팅 모달
import ExitChat from 'components/modals/ExitChat';

// settings 모달
import ChangeEmail from 'components/modals/ChangeEmail';
import ChangeNickname from 'components/modals/ChangeNickname';
import ChangePw from 'components/modals/ChangePw';
import Desc from 'components/modals/Desc';
import DeleteAccount from 'components/modals/DeleteAccount';

// 그림 모달
import Drawing from 'components/modals/drawing';

// 기타 등등 모달
import Penalty from 'components/modals/Penalty';
import Report from 'components/modals/Report';
import UserInfo from 'components/modals/UserInfo';

function Modal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectModalIsOpen);
  const modal = useAppSelector(selectModalModal);
  const props = useAppSelector(selectModalProps);

  if (!isOpen) return null;
  return createPortal(
    <Container>
      <Background onClick={(e) => dispatch(closeModal())} />
      {/* drawing 모달은 그 자체로 모달 컴포넌트 특징을 가지고 있기 때문에 예외처리한다. */}
      {modal === 'drawing' && <Drawing />}
      {modal !== 'drawing' && (
        <ModalBox>
          <CloseIcon onClick={(e) => dispatch(closeModal())} />
          {modal === 'login' && <Login />}
          {modal === 'deleteAccount' && <DeleteAccount />}
          {modal === 'exitChat' && <ExitChat />}
          {modal === 'signUpGuide' && <SignUpGuide />}
          {modal === 'forgotPw' && <ForgotPw />}
          {modal === 'changeEmail' && <ChangeEmail />}
          {modal === 'changeNickname' && <ChangeNickname />}
          {modal === 'changePw' && <ChangePw />}

          {modal === 'desc' && <Desc props={props} />}
          {modal === 'penalty' && <Penalty props={props} />}
          {modal === 'report' && <Report props={props} />}
          {modal === 'userInfo' && <UserInfo props={props} />}
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
