import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectModalOk, selectModalMode, closeModal } from '@src/store/slices/modal.slice';
import LoginModal from '@src/components/modals/auth/Login.modal';
import DelAccountModal from '@src/components/modals/settings/DelAccount.modal';
import ExitChatModal from '@src/components/modals/chat/ExitChat.modal';
import RegisterGuide from '@src/components/modals/auth/RegisterGuide';
import FindPw from '@src/components/modals/auth/FindPw';
import EditEmailModal from '@src/components/modals/settings/EditEmail.modal';
import EditNicknameModal from '@src/components/modals/settings/EditNickname.modal';
import EditPwModal from '@src/components/modals/settings/EditPw.modal';
import SearchModal from '@src/components/modals/search/Search.modal';
import ShowDescModal from '@src/components/modals/profile/ShowDesc.modal';
import ShowDrawingModal from '@src/components/modals/profile/ShowDrawing.modal';

function Modal() {
  const dispatch = useAppDispatch();
  const ok = useAppSelector(selectModalOk);
  const mode = useAppSelector(selectModalMode);

  const onCloseModal = async (e: React.MouseEvent<HTMLDivElement>) => {
    await dispatch(closeModal());
  };

  if (!ok) return null;
  return createPortal(
    <Container>
      <Background onClick={onCloseModal} />
      {!ok && !mode && null}
      {ok && mode === 'login' && <LoginModal />}
      {ok && mode === 'delAccount' && <DelAccountModal />}
      {ok && mode === 'exitChat' && <ExitChatModal />}
      {ok && mode === 'registerGuide' && <RegisterGuide />}
      {ok && mode === 'findPw' && <FindPw />}
      {ok && mode === 'editEmail' && <EditEmailModal />}
      {ok && mode === 'editNickname' && <EditNicknameModal />}
      {ok && mode === 'editPw' && <EditPwModal />}
      {ok && mode === 'search' && <SearchModal />}
      {ok && mode === 'showDesc' && <ShowDescModal />}
      {ok && mode === 'showDrawing' && <ShowDrawingModal />}
    </Container>,
    document.getElementById('portal') as HTMLElement
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

export default Modal;
