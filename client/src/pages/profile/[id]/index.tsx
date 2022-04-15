import styled from 'styled-components';
import { useGetProfile } from '@src/hook/useInitPage';
import Drawing from '@src/pages/profile/[id]/Drawing';
import { selectProfileOk } from '@src/store/slices/profile.slice';
import NotFound from '@src/components/NotFound';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import { useAppSelector } from '@src/store/app/hook';
import { selectProfileProfile } from '@src/store/slices/profile.slice';

function Profile() {
  useGetProfile();

  // 존재하지 않는 profileId를 url에서 조회할때 존재하지 않는경우 오류페이지를 보여준다.
  const ok = useAppSelector(selectProfileOk);
  const profile = useAppSelector(selectProfileProfile);

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
          <Nickname
            exp={profile?.exp!}
            userId={profile?.id!}
            chatUserId={profile?.chatId!}
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
