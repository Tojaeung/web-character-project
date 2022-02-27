import React, { useRef } from 'react';
import { Container } from './Account.styled';
import axios from 'axios';
import SettingsList from '@src/components/settings/SettingsList';
import { useAppDispatch } from '@src/redux/app/hook';
import { refreshLogin } from '@src/redux/requests/auth.request';
import { openModal } from '@src/redux/slices/modal.slice';

function Account() {
  const dispatch = useAppDispatch();

  // 프로필 사진 변경
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const onEditAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    const formData = new FormData();
    formData.append('newAvatar', e.target?.files[0]);

    const res = await axios.post('/api/settings/account/editAvatar', formData, { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    await dispatch(refreshLogin());
  };

  const onDefaultAvatar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await axios.get('/api/settings/account/defaultAvatar', { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    await dispatch(refreshLogin());
  };

  // 커버 사진 변경
  const coverInputRef = useRef<HTMLInputElement>(null);
  const onEditCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    const formData = new FormData();
    formData.append('newCover', e.target?.files[0]);

    const res = await axios.post('/api/settings/account/editCover', formData, { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    await dispatch(refreshLogin());
  };

  const onDefaultCover = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await axios.get('/api/settings/account/defaultCover', { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    await dispatch(refreshLogin());
  };

  const onEditEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ mode: 'editEmail' }));
  };

  const onEditNickname = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ mode: 'editNickname' }));
  };
  const onEditPw = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ mode: 'editPw' }));
  };

  return (
    <>
      <SettingsList />
      <Container>
        <div className="list-wrapper">
          <div className="title">프로필 이미지 변경</div>
          <div className="btn-wrapper">
            <button className="defaultBtn" onClick={onDefaultAvatar}>
              기본이미지
            </button>
            <button className="btn" onClick={(e) => avatarInputRef.current?.click()}>
              변경
            </button>
          </div>
          <input
            className="input"
            type="file"
            accept="image/png, image/jpeg,image/jpg"
            ref={avatarInputRef}
            onChange={onEditAvatar}
          />
        </div>
        <div className="list-wrapper">
          <div className="title">커버 이미지 변경</div>
          <div className="btn-wrapper">
            <button className="defaultBtn" onClick={onDefaultCover}>
              기본이미지
            </button>
            <button className="btn" onClick={(e) => coverInputRef.current?.click()}>
              변경
            </button>
          </div>
          <input
            className="input"
            type="file"
            accept="image/png, image/jpeg,image/jpg"
            ref={coverInputRef}
            onChange={onEditCover}
          />
        </div>
        <div className="list-wrapper">
          <div className="title">
            이메일 변경<span className="email-subTitle">(※ 이메일 인증이 필요합니다.)</span>
          </div>
          <button className="btn" onClick={onEditEmail}>
            변경
          </button>
        </div>
        <div className="list-wrapper">
          <div className="title">닉네임 변경</div>
          <button className="btn" onClick={onEditNickname}>
            변경
          </button>
        </div>
        <div className="list-wrapper">
          <div className="title">비밀번호 변경</div>
          <button className="btn" onClick={onEditPw}>
            변경
          </button>
        </div>
        <div className="list-wrapper">
          <div className="title">계정탈퇴</div>
          <button className="btn delAccount-btn" onClick={() => dispatch(openModal({ mode: 'delAccount' }))}>
            계정탈퇴
          </button>
        </div>
      </Container>
    </>
  );
}

export default Account;
