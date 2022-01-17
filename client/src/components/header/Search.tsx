import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { Container } from '@src/components/header/Search.styled';

function Search() {
  const [search, setSearch] = useState('');

  return (
    <Container>
      <div className="search">
        <BsSearch className="search__icon" />
        {search && <IoMdClose className="search__XIcon" onClick={(e) => setSearch('')} />}
        <input
          className="search__input"
          type="text"
          placeholder="#태그명/@유저명(프로필)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </Container>
  );
}

export default Search;
