import React from 'react';
import styled from 'styled-components';

import Search from '@src/layouts/Header/Search';

function Search1() {
  return (
    <Container>
      <Search />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  min-height: 5rem;
  position: fixed;
  top: 0;
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
`;

export default Search1;
