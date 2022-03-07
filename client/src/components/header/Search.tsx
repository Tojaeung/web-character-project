import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import { greenButtonStyle, greenInputStyle } from '@src/styles/GlobalStyles';

function Search() {
  const [searchValue, setSearchValue] = useState('');

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // 검색어가 제출된다.
    }
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 검색어 제출
  };

  return (
    <Container>
      <input
        type="text"
        placeholder="검색..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={onKeyPress}
      />
      <BsSearch className="search-icon" />
      <IoMdClose className="cancel-icon" onClick={(e) => setSearchValue('')} />
      <button onClick={onSubmit}>검색</button>
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

  input {
    ${greenInputStyle};
    padding: 0 3rem;
    min-height: 3.5rem;
  }
  .search-icon {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .cancel-icon {
    font-size: 2rem;
    cursor: pointer;
    position: absolute;
    top: 0.8rem;
    right: 1rem;
  }

  button {
    ${greenButtonStyle};
    padding: 0.7rem;
    display: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
    .cancel-icon {
      right: 5rem;
    }
    button {
      display: block;
    }
  }
`;

export default Search;
