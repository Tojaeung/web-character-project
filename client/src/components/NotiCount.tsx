import React from 'react';
import styled from 'styled-components';

interface IProps {
  notiNum: number;
  size: 'small' | 'medium' | 'large';
}

function NotiCount({ notiNum, size }: IProps) {
  return (
    <Container size={size}>
      <NotiNum size={size}>{notiNum}</NotiNum>
    </Container>
  );
}

const Container = styled.div<{ size: string }>`
  width: 100%;
  background-color: red;
  border-radius: 100%;
  padding: 0.3rem;
`;
const NotiNum = styled.span<{ size: string }>`
  font-size: 1.2rem;
  color: white;
`;

export default NotiCount;
