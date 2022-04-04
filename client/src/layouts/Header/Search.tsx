import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@src/components/Input';
import Button from '@src/components/Button';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

interface IProp {
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

function Search({ setShowSearch }: IProp) {
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

      <SearchButton color="green" size="small">
        검색
      </SearchButton>
      <CancelButton color="red" size="small" onClick={(e) => setShowSearch(false)}>
        취소
      </CancelButton>
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
    right: 10.5rem;
  }
`;

const SearchButton = styled(Button)`
  display: none;

  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    font-size: 1.2rem;
    padding: 1rem;
  }
`;
const CancelButton = styled(Button)`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
    padding: 1rem;
    display: block;
  }
`;

export default Search;
