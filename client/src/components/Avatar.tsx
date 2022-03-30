import React from 'react';
import styled from 'styled-components';

interface IProps {
  src: string | undefined;
  size: string;
}

function Avatar({ src, size }: IProps) {
  return (
    <Container>
      <div className={`avatar ${size}`}>
        <img src={src} alt="프로필 사진" />
      </div>
    </Container>
  );
}

const Container = styled.div`
  .avatar {
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.palette.black};
  }
  .small {
    width: 4rem;
    height: 4rem;
  }

  .medium {
    width: 1rem;
    height: 1rem;
  }
  .large {
    width: 10rem;
    height: 10rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Avatar;
