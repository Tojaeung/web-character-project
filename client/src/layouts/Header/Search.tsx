import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@src/components/Input';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import SearchButton from '@src/components/header/SearchButton';

function Search() {
  const [searchValue, setSearchValue] = useState('');

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // 검색어가 제출된다.
    }
  };

  return (
    <Container>
      <ModifiedInput
        color="green"
        type="text"
        placeholder="검색..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={onKeyPress}
      />
      <SearchIcon />
      <CancelIcon onClick={(e) => setSearchValue('')} />
      <SearchButton />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const ModifiedInput = styled(Input)`
  padding: 0rem 4rem;
`;
const SearchIcon = styled(BsSearch)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 2rem;
  cursor: pointer;
`;
const CancelIcon = styled(IoMdClose)`
  position: absolute;
  font-size: 2.5rem;
  cursor: pointer;
  top: 0.7rem;
  right: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    right: 7.5rem;
  }
`;

export default Search;
