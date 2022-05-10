import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { BiImageAdd } from 'react-icons/bi';
import Drawing from './Drawing';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import { useAppDispatch } from '@src/store/app/hook';
import { UserType } from '@src/types';
import { getUser } from '@src/store/requests/user.request';
import { greenButtonStyle } from '@src/styles/button.style';

function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
  }, []);

  return (
    <Container>
      <ProfileBox>
        <CoverBox>
          <Image src={profile?.cover} alt="커버사진" />
        </CoverBox>

        <AvatarBox>
          <Avatar src={profile?.avatar} diameter={10} />
        </AvatarBox>

        <NicknameBox>
          <Nickname
            exp={profile?.exp!}
            userId={profile?.id!}
            chatId={profile?.chatId!}
            desc={profile?.desc!}
            nickname={profile?.nickname!}
            dropDown={true}
            fontSize={1.7}
          />
        </NicknameBox>
        <AddDrawingButton onClick={(e) => navigate('/create/drawingForm')}>
          <AddDrawingIcon />
          그림추가
        </AddDrawingButton>
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
const NicknameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 5.5rem;
`;
const AddDrawingButton = styled.button`
  ${greenButtonStyle};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.5rem;
  margin-top: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;
const AddDrawingIcon = styled(BiImageAdd)`
  font-size: 3rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2.5rem;
  }
`;

const DrawingBox = styled.section``;

export default Profile;
