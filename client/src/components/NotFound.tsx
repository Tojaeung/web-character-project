import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NotFoundImage from 'assets/images/not-found.svg';

function NotFound() {
  const navigate = useNavigate();
  return (
    <Container>
      <img width="80%" src={NotFoundImage} alt="not-found" onClick={(e) => navigate('/')} />;
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  img {
    cursor: pointer;
  }
`;

export default NotFound;
