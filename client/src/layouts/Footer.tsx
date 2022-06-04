import styled from 'styled-components';

function Footer() {
  return (
    <Container>
      <Intro>
        <Title>그림러들</Title>
        <Description>그림 그리기를 좋아하는 사람들을 위한 커뮤니티 사이트입니다.</Description>
      </Intro>
      <Detailed>
        <a href="https://github.com/Tojaeung/web-character-project" target="_blank" rel="noreferrer">
          https://github.com/Tojaeung
        </a>
        <p>Tel: 010-2230-1027</p>
        <p>Copyright ⓒtojaeung</p>
      </Detailed>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.bgColor};
  padding: 2rem;
  margin-top: 1rem;
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  @media ${({ theme }) => theme.device.mobile} {
    gap: 1rem;
    padding: 1rem;
  }
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;

const Detailed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.3rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
  }
`;

export default Footer;
