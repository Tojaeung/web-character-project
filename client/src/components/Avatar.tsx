import styled, { css } from 'styled-components';

interface IProps {
  src: string | undefined;
  size: string;
}

function Avatar({ src, size }: IProps) {
  return (
    <Container size={size}>
      <Image src={src} alt="프로필 사진" />
    </Container>
  );
}

const Container = styled.div<{ size: string }>`
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palette.black};
  &:hover {
    border: 2px solid ${({ theme }) => theme.palette.black};
  }
  ${({ size }) => {
    if (size === 'small') {
      return css`
        width: 3.5rem;
        height: 3.5rem;
      `;
    } else if (size === 'medium') {
      return css`
        width: 4rem;
        height: 4rem;
      `;
    } else if (size === 'large') {
      return css`
        width: 10rem;
        height: 10rem;
      `;
    }
  }}
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Avatar;
