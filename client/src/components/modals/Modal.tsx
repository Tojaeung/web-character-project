import React from 'react';
import { createPortal } from 'react-dom';
import { Container } from './Modal.styled';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectModalOk, selectModalMode, closeModal } from '@src/redux/slices/modal.slice';
import LoginModal from '@src/components/modals/auth/Login.modal';
import DelAccountModal from '@src/components/modals/settings/DelAccount.modal';
import ExitChatModal from '@src/components/modals/chat/ExitChat.modal';
import RegisterGuide from '@src/components/modals/auth/RegisterGuide';
import FindPw from '@src/components/modals/auth/FindPw';
import EditEmailModal from '@src/components/modals/settings/EditEmail.modal';
import EditNicknameModal from '@src/components/modals/settings/EditNickname.modal';
import EditPwModal from '@src/components/modals/settings/EditPw.modal';
import ShowDescModal from '@src/components/modals/profile/ShowDesc.modal';
import AddPhotoModal from '@src/components/modals/profile/AddPhoto.modal';

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
      <div className="background" onClick={onCloseModal} />
      {!ok && !mode && null}
      {ok && mode === 'login' && <LoginModal />}
      {ok && mode === 'delAccount' && <DelAccountModal />}
      {ok && mode === 'exitChat' && <ExitChatModal />}
      {ok && mode === 'registerGuide' && <RegisterGuide />}
      {ok && mode === 'findPw' && <FindPw />}
      {ok && mode === 'editEmail' && <EditEmailModal />}
      {ok && mode === 'editNickname' && <EditNicknameModal />}
      {ok && mode === 'editPw' && <EditPwModal />}
      {ok && mode === 'showDesc' && <ShowDescModal />}
      {ok && mode === 'addPhoto' && <AddPhotoModal />}
    </Container>,
    document.getElementById('portal') as HTMLElement
  );
}

export default Modal;
