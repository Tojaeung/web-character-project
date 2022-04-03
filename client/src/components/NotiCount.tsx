import React from 'react';
import styled from 'styled-components';

interface IProps {
  notiNum: number;
}

function NotiCount({ notiNum }: IProps) {
  return (
    <Container>
      <NotiNum>{notiNum}</NotiNum>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: red;
  border-radius: 100%;
  padding: 0.3rem;
`;
const NotiNum = styled.span`
  font-size: 1.2rem;
  color: white;
`;

export default NotiCount;
