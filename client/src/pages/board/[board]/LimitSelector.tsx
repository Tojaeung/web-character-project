import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

interface IProp {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  searchType: string;
  keyword: string;
}

function LimitSelector({ setPage, limit, setLimit, searchType, keyword }: IProp) {
  const navigate = useNavigate();
  const { board } = useParams();

  const selectPostNum = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);

    if (keyword !== '') {
      return navigate(`/${board}?page=1&limit=${Number(e.target.value)}&searchType=${searchType}&keyword=${keyword}`);
    }
    return navigate(`/${board}?page=1&limit=${Number(e.target.value)}`);
  };

  return (
    <Container>
      <Label htmlFor="postNum">게시물 수</Label>
      <Select name="postNum" value={limit} onChange={selectPostNum}>
        <Option value={10}>10개</Option>
        <Option value={20}>20개</Option>
        <Option value={30}>30개</Option>
      </Select>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Label = styled.label`
  font-size: 1.4rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;
const Select = styled.select``;
const Option = styled.option``;

export default LimitSelector;
