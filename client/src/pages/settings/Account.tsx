import React from 'react';
import { Container } from './Account.styled';
import SettingsList from '@src/components/settings/SettingsList';
import { useAppSelector, useAppDispatch } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import AccountInput from '@src/components/settings/AccountInput';
import AccountPw from '@src/components/settings/AccountPw';

function Account() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  return (
    <>
      <SettingsList list="account" />
      <Container>
        <div className="infoWrapper">
          <AccountInput type="email" />
          <AccountInput type="nickname" />
          <AccountPw />

          <div className="delete">
            <div className="title">계정탈퇴</div>
            <div className="delete-subtitle">
              일정 기간 또는 영구적으로 재가입이 제한됩니다. 탈퇴한 경우 글/댓글 삭제는 가능하지 않으며 이용약관에 따라
              타인 글로 간주합니다.
            </div>
            <button className="btn">계정탈퇴</button>
          </div>
        </div>

        <div className="avatar">
          <div className="title">프로필 사진 변경</div>
          <div className="avatar-wrapper">
            <img className="avatar-img" src={user?.avatar} alt="프사" />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Account;
