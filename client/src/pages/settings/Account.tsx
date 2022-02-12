import React, { useState, useRef } from 'react';
import { Container } from './Account.styled';
import axios from 'axios';
import SettingsList from '@src/components/settings/SettingsList';
import { useAppSelector, useAppDispatch } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { refreshLogin } from '@src/redux/requests/auth.request';
import { openModal } from '@src/redux/slices/modal.slice';

function Account() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  // 왼쪽 유저 정보 변경
  const onEditEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ mode: 'editEmail' }));
  };

  const onEditNickname = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ mode: 'editNickname' }));
  };
  const onEditPw = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ mode: 'editPw' }));
  };

  // 오른쪽 프로필 사진 변경
  const [openEditAvatar, setOpenEditAvatar] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const onEditAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    const formData = new FormData();
    formData.append('newAvatar', e.target?.files[0]);

    const res = await axios.post('/api/settings/account/avatar', formData, { withCredentials: true });
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

  return (
    <>
      <SettingsList />
      <Container>
        <div>
          <div className="title">프로필 사진 변경</div>
          <div
            className="avatar-wrapper"
            onMouseEnter={(e) => setOpenEditAvatar(true)}
            onMouseLeave={(e) => setOpenEditAvatar(false)}
          >
            {openEditAvatar && (
              <>
                <div className="background" />
                <input
                  className="input"
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={inputRef}
                  onChange={onEditAvatar}
                />
                <button className="default-btn" onClick={onDefaultAvatar}>
                  기본 프로필
                </button>
                <button className="edit-btn" onClick={(e) => inputRef.current?.click()}>
                  프로필 변경
                </button>
              </>
            )}

            <img className="avatar-img" src={user?.avatar} alt="프사" />
          </div>
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
