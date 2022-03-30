import styled from 'styled-components';
import { useGetProfile } from '@src/hook/useGetProfile';
import Info from '@src/pages/profile/[id]/Info';
import Drawing from '@src/pages/profile/[id]/Drawing';
import { selectProfileOk } from '@src/store/slices/profile.slice';
import { useAppSelector } from '@src/store/app/hook';
import NotFound from '@src/components/NotFound';

function Profile() {
  // 존재하지 않는 profileId를 url에서 조회할때 존재하지 않는경우 오류페이지를 보여준다.
  const ok = useAppSelector(selectProfileOk);
  useGetProfile();

  return !ok ? (
    <NotFound />
  ) : (
    <Container>
      <InfoSection>
        <Info />
      </InfoSection>
      <DrawingSection>
        <Drawing />
      </DrawingSection>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
`;
const InfoSection = styled.section`
  width: 100%;
`;

const DrawingSection = styled.section`
  margin-top: 18rem;
`;

export default Profile;
