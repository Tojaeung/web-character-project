import { Container } from './[id].styled';
import { useProfileGetUser } from '@src/hook/useProfileGetUser';
import Info from '@src/components/profile/Info';

function Profile() {
  useProfileGetUser();

  return (
    <Container>
      <div className="info">
        <Info />
      </div>
      <div className="wrapper">
        <div className="list"></div>
        <div className="content"></div>
      </div>
    </Container>
  );
}

export default Profile;
