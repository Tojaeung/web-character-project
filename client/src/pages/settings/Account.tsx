import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@src/store/app/hook';
import { openModal } from '@src/store/slices/modal.slice';
import TabMenu from './TabMenu';
import Button from '@src/components/Button';
import { editAvatar, editCover, editDefaultAvatar, editDefaultCover } from '@src/store/requests/settings.request';

function Account() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 프로필 사진 변경
  const avatarRef = useRef<HTMLInputElement>(null);
  const handleEditAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    const formData = new FormData();
    formData.append('newAvatar', e.target?.files[0]);

    try {
      const res = await dispatch(editAvatar(formData)).unwrap();
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDefaultAvatar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await dispatch(editDefaultAvatar()).unwrap();
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
    formData.append('newCover', e.target?.files[0]);

    try {
      const res = await dispatch(editCover(formData)).unwrap();
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDefaultCover = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await dispatch(editDefaultCover()).unwrap();
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEditEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ mode: 'editEmail' }));
  };

  const handleEditNickname = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ mode: 'editNickname' }));
  };
  const handleEditPw = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ mode: 'editPw' }));
  };

  const handleDelAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await dispatch(openModal({ mode: 'delAccount' }));
  };

  return (
    <>
      <TabMenu />
      <Container>
        <EditBox>
          <Title>프로필 사진</Title>
          <ButtonBox>
            <DefaultButton color="red" size="small" inverse={true} onClick={handleDefaultAvatar}>
              기본 프로필 사진
            </DefaultButton>
            <EditButton color="green" size="small" onClick={(e) => avatarRef.current?.click()}>
              변경
            </EditButton>
          </ButtonBox>
          <Input type="file" accept="image/png, image/jpeg,image/jpg" ref={avatarRef} onChange={handleEditAvatar} />
        </EditBox>

        <EditBox>
          <Title>커버 사진</Title>
          <ButtonBox>
            <DefaultButton color="red" size="small" inverse={true} onClick={handleDefaultCover}>
              기본 커버 사진
            </DefaultButton>
            <EditButton color="green" size="small" onClick={(e) => coverRef.current?.click()}>
              변경
            </EditButton>
          </ButtonBox>
          <Input type="file" accept="image/png, image/jpeg,image/jpg" ref={coverRef} onChange={handleEditCover} />
        </EditBox>

        <EditBox>
          <Title>이메일</Title>
          <EditButton color="green" size="small" onClick={handleEditEmail}>
            변경
          </EditButton>
        </EditBox>

        <EditBox>
          <Title>닉네임</Title>
          <EditButton color="green" size="small" onClick={handleEditNickname}>
            변경
          </EditButton>
        </EditBox>

        <EditBox>
          <Title>이메일</Title>
          <EditButton color="green" size="small" onClick={handleEditPw}>
            변경
          </EditButton>
        </EditBox>

        <EditBox>
          <Title>계정탈퇴</Title>
          <EditButton color="red" size="small" onClick={handleDelAccount}>
            탈퇴하기
          </EditButton>
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
const EditButton = styled(Button)``;
const DefaultButton = styled(Button)``;
const Input = styled.input`
  display: none;
`;

export default Account;
