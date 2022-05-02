import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Drawing from '@src/pages/profile/Drawing';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import { useAppDispatch } from '@src/store/app/hook';
import { UserType } from '@src/types';
import { getUser } from '@src/store/requests/user.request';
import NotFound from '@src/components/NotFound';

function Profile() {
  const dispatch = useAppDispatch();

  const { profileId } = useParams();

  const [profile, setProfile] = useState<UserType>();

  useEffect(() => {
    try {
      dispatch(getUser({ userId: Number(profileId) }))
        .unwrap()
        .then((res) => {
          const { user } = res;
          setProfile(user);
        });
    } catch (err: any) {
      alert(err.message);
    }
  }, [dispatch, profileId]);

  if (!profile) return <NotFound />;
  return (
    <Container>
      <ProfileBox>
        <CoverBox>
          <Image src={profile?.cover} alt="커버사진" />
        </CoverBox>

        <AvatarBox>
          <Avatar src={profile?.avatar} size="large" />
        </AvatarBox>

        <UserInfoBox>
          <Nickname
            exp={profile?.exp!}
            userId={profile?.id!}
            chatId={profile?.chatId!}
            desc={profile?.desc!}
            nickname={profile?.nickname!}
            dropDown={true}
            size="large"
          />
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
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  margin-top: 5.5rem;
`;

const DrawingBox = styled.section``;

export default Profile;
