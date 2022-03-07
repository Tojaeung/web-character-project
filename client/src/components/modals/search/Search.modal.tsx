import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch } from '@src/redux/app/hook';
import { closeModal } from '@src/redux/slices/modal.slice';

import Search from '@src/components/header/Search';

function SearchModal() {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Search />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
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

export default SearchModal;
