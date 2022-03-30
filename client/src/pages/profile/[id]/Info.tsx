import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Avatar from '@src/components/common/Avatar';
import Nickname from '@src/components/common/Nickname';
import FollowBtn from '@src/components/common/FollowBtn';
import ChatBtn from '@src/components/common/ChatBtn';
import StyledInput from '@src/styles/StyledInput';
import StyledButton from '@src/styles/StyledButton';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectProfileProfile } from '@src/store/slices/profile.slice';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { openModal } from '@src/store/slices/modal.slice';

function Info() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profile = useAppSelector(selectProfileProfile);
  const user = useAppSelector(selectAuthUser);

  // 자기소개를 클릭하면 자기소개 모달창이 나타난다.
  const onShowDesc = async (e: React.MouseEvent<HTMLDivElement>) => {
    await dispatch(openModal({ mode: 'showDesc' }));
  };

  return (
    <Container>
      <CoverBox>
        <Image src={profile?.cover} alt="커버사진" />
      </CoverBox>

      <UserInfoBox>
        <Avatar src={profile?.avatar} size="large" />
        <Nickname exp={profile?.exp!} nickname={profile?.nickname!} size="large" />

        <Desc onClick={onShowDesc}>자기소개</Desc>

        <FollowInfoBox>
          <span>팔로워 {profile?.followers.length}</span>
          <span>팔로잉 {profile?.followings.length}</span>
        </FollowInfoBox>

        <ButtonBox>
          <ChatBtn id={profile?.id!} userId={profile?.userId!} />

          <FollowBtn followers={profile?.followers!} id={profile?.id!} nickname={profile?.nickname!} />

          {user?.id === profile?.id && (
            <AddDrawingButton color="green" size="small" onClick={(e) => navigate('/createDrawingForm')}>
              추가
            </AddDrawingButton>
          )}
        </ButtonBox>
      </UserInfoBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 999;
`;

const CoverBox = styled.div`
  max-width: 100%;
  width: 60rem;
  height: 30rem;
  border-radius: 10px;
  overflow: hidden;
`;
const Image = styled.img`
  max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  position: absolute;
  top: 25rem;
`;
const Desc = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const FollowInfoBox = styled.div`
  font-size: 1.5rem;
  display: flex;
  gap: 1rem;
`;
const ButtonBox = styled.div`
  display: flex;
  gap: 1rem;
`;
const AddDrawingButton = styled(StyledButton)``;

export default Info;
