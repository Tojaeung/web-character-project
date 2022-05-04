import styled, { css } from 'styled-components';

interface IProps {
  src?: string;
  diameter: number;
}

function Avatar({ src, diameter }: IProps) {
  return (
    <Container diameter={diameter}>
      <Image src={src} alt="프로필 사진" />
    </Container>
  );
}

const Container = styled.div<{ diameter: number }>`
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palette.black};
  &:hover {
    border: 2px solid ${({ theme }) => theme.palette.black};
  }
  ${({ diameter }) => {
    return css`
      width: ${diameter}rem;
      height: ${diameter}rem;
    `;
  }}
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Avatar;
