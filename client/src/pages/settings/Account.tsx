import React, { useState, useRef } from 'react';
import { Container } from './Account.styled';
import axios from 'axios';
import SettingsList from '@src/components/settings/SettingsList';
import { useAppSelector, useAppDispatch } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import AccountEmail from '@src/components/settings/AccountEmail';
import AccountNickname from '@src/components/settings/AccountNickname';
import AccountPw from '@src/components/settings/AccountPw';
import DelAccountModal from '@src/components/modals/DelAccount.modal';
import { refreshLogin } from '@src/redux/requests/auth.request';

function Account() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  const [openDelAccountModal, setOpenDelAccountModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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
      <SettingsList list="account" />
      <Container>
        <div className="infoWrapper">
          <AccountEmail />
          <AccountNickname />
          <AccountPw />

          <div className="delAccount">
            <div className="title">계정탈퇴</div>

            <button className="btn" onClick={(e) => setOpenDelAccountModal(true)}>
              계정탈퇴
            </button>
          </div>
        </div>

        <div className="avatar">
          <div className="title">프로필 사진 변경</div>

          <div
            className="avatar-wrapper"
            onMouseEnter={(e) => setOpenEdit(true)}
            onMouseLeave={(e) => setOpenEdit(false)}
          >
            {openEdit && (
              <>
                <div className="background" />
                <input
                  className="edit-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={inputRef}
                  onChange={onEditAvatar}
                />
                <button className="default" onClick={onDefaultAvatar}>
                  기본 프로필
                </button>
                <button className="edit" onClick={(e) => inputRef.current?.click()}>
                  프로필 변경
                </button>
              </>
            )}

            <img className="avatar-img" src={user?.avatar} alt="프사" />
          </div>
        </div>
      </Container>
      <DelAccountModal openDelAccountModal={openDelAccountModal} setOpenDelAccountModal={setOpenDelAccountModal} />
    </>
  );
}

export default Account;
