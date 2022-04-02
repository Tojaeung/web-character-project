import React from 'react';
import styled from 'styled-components';
import StyledButton from '@src/components/Button';

const handelSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
  // 검색어 제출
};

function SearchButton() {
  return (
    <Button color="green" size="small" onClick={handelSearch}>
      검색
    </Button>
  );
}

const Button = styled(StyledButton)`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
  }
`;

export default SearchButton;
