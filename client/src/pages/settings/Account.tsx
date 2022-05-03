import React, { useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '@src/store/app/hook';
import { openModal } from '@src/store/slices/modal.slice';
import TabMenu from './TabMenu';
import { greenButtonStyle, redButtonStyle } from '@src/styles/button.style';
import { updateAvatar, updateCover, updateDefaultAvatar, updateDefaultCover } from '@src/store/requests/user.request';

function Account() {
  const dispatch = useAppDispatch();

  // 프로필 사진 변경
  const avatarRef = useRef<HTMLInputElement>(null);
  const handleEditAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    const formData = new FormData();
    formData.append('updatedAvatar', e.target?.files[0]);

    try {
      const res = await dispatch(updateAvatar(formData)).unwrap();
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDefaultAvatar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await dispatch(updateDefaultAvatar()).unwrap();
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // 커버 사진 변경
  const coverRef = useRef<HTMLInputElement>(null);
  const handleEditCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    const formData = new FormData();
    formData.append('updatedCover', e.target?.files[0]);

    try {
      const res = await dispatch(updateCover(formData)).unwrap();
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDefaultCover = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await dispatch(updateDefaultCover()).unwrap();
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEditEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ modal: 'changeEmail' }));
  };

  const handleEditNickname = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ modal: 'changeNickname' }));
  };
  const handleEditPw = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ modal: 'changePw' }));
  };

  const handleDelAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ modal: 'deleteAccount' }));
  };

  return (
    <>
      <TabMenu />
      <Container>
        <EditBox>
          <Title>프로필</Title>
          <ButtonBox>
            <DefaultButton onClick={handleDefaultAvatar}>기본 프로필</DefaultButton>
            <EditButton onClick={(e) => avatarRef.current?.click()}>변경</EditButton>
          </ButtonBox>
          <Input type="file" accept="image/png, image/jpeg,image/jpg" ref={avatarRef} onChange={handleEditAvatar} />
        </EditBox>

        <EditBox>
          <Title>커버</Title>
          <ButtonBox>
            <DefaultButton onClick={handleDefaultCover}>기본 커버</DefaultButton>
            <EditButton onClick={(e) => coverRef.current?.click()}>변경</EditButton>
          </ButtonBox>
          <Input type="file" accept="image/png, image/jpeg,image/jpg" ref={coverRef} onChange={handleEditCover} />
        </EditBox>

        <EditBox>
          <Title>이메일</Title>
          <EditButton onClick={handleEditEmail}>변경</EditButton>
        </EditBox>

        <EditBox>
          <Title>닉네임</Title>
          <EditButton onClick={handleEditNickname}>변경</EditButton>
        </EditBox>

        <EditBox>
          <Title>비밀번호</Title>
          <EditButton onClick={handleEditPw}>변경</EditButton>
        </EditBox>

        <EditBox>
          <Title>계정탈퇴</Title>
          <EditButton onClick={handleDelAccount}>탈퇴하기</EditButton>
        </EditBox>
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.bgColor};
`;
const EditBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
`;
const Title = styled.span`
  font-size: 2rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.6rem;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  @media ${({ theme }) => theme.device.mobile} {
    gap: 1rem;
  }
`;
const EditButton = styled.button`
  ${greenButtonStyle};
  padding: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.5rem;
    font-size: 1.2rem;
  }
`;
const DefaultButton = styled.button`
  ${redButtonStyle};
  padding: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.5rem;
    font-size: 1.2rem;
  }
`;
const Input = styled.input`
  display: none;
`;

export default Account;
