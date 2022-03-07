import styled from 'styled-components';
import { useProfileGetUser } from '@src/hook/useProfileGetUser';
import Info from '@src/components/profile/Info';
import Drawing from '@src/components/profile/Drawing';
import { selectProfileOk } from '@src/redux/slices/profile.slice';
import { useAppSelector } from '@src/redux/app/hook';
import NotFound from '@src/components/NotFound';

function Profile() {
  // 존재하지 않는 profileId를 url에서 조회할때 존재하지 않는경우 오류페이지를 보여준다.
  const ok = useAppSelector(selectProfileOk);
  useProfileGetUser();

  return !ok ? (
    <NotFound />
  ) : (
    <Container>
      <div className="info">
        <Info />
      </div>
      <div className="photo">
        <Drawing />
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  .info {
    width: 100%;
  }
`;

export default Profile;
