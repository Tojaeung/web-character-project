import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProfile } from '@src/hook/useInitPage';
import Drawing from '@src/pages/profile/[id]/Drawing';
import { selectProfileOk } from '@src/store/slices/profile.slice';
import NotFound from '@src/components/NotFound';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import FollowButton from '@src/components/FollowButton';
import ChatButton from '@src/components/ChatButton';
import Button from '@src/components/Button';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectProfileProfile } from '@src/store/slices/profile.slice';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { openModal } from '@src/store/slices/modal.slice';

function Profile() {
  useGetProfile();

  // 존재하지 않는 profileId를 url에서 조회할때 존재하지 않는경우 오류페이지를 보여준다.
  const ok = useAppSelector(selectProfileOk);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfileProfile);
  const user = useAppSelector(selectAuthUser);

  // 자기소개를 클릭하면 자기소개 모달창이 나타난다.
  const onShowDesc = async (e: React.MouseEvent<HTMLDivElement>) => {
    await dispatch(openModal({ mode: 'showDesc' }));
  };

  return !ok ? (
    <NotFound />
  ) : (
    <Container>
      <ProfileBox>
        <CoverBox>
          <Image src={profile?.cover} alt="커버사진" />
        </CoverBox>

        <AvatarBox>
          <Avatar src={profile?.avatar} size="large" />
        </AvatarBox>

        <UserInfoBox>
          <Nickname exp={profile?.exp!} nickname={profile?.nickname!} size="large" />

          <Desc onClick={onShowDesc}>자기소개</Desc>

          <FollowInfoBox>
            <span>팔로워 {profile?.followers.length}</span>
            <span>팔로잉 {profile?.followings.length}</span>
          </FollowInfoBox>
          {user && user?.id !== profile?.id && (
            <ButtonBox>
              <ChatButton chatPartnerId={profile?.id!} chatPartnerUserId={profile?.userId!} />

              <FollowButton followers={profile?.followers!} id={profile?.id!} nickname={profile?.nickname!} />
            </ButtonBox>
          )}
          {user?.id === profile?.id && (
            <AddDrawingButton color="green" size="small" onClick={(e) => navigate('/create/drawingForm')}>
              추가
            </AddDrawingButton>
          )}
        </UserInfoBox>
      </ProfileBox>
      <DrawingBox>
        <Drawing />
      </DrawingBox>
    </Container>
  );
}

const AvatarBox = styled.div`
  position: absolute;
  top: 25rem;
  left: calc(50% - 5rem);
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.palette.white};
`;
const ProfileBox = styled.section`
  width: 100%;
  position: relative;
`;
const CoverBox = styled.div`
  margin: 0 auto;
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
  margin-top: 5.5rem;
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
const AddDrawingButton = styled(Button)``;

const DrawingBox = styled.section`
  /* margin-top: 16.5rem; */
`;

export default Profile;
