import React from 'react';
import styled from 'styled-components';

interface IProp {
  page: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

function LimitSelector({ limit, setLimit }: IProp) {
  return (
    <Container>
      <Label htmlFor="postNum">게시물 수</Label>
      <Select name="postNum" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
        <Option defaultValue={10}>10개</Option>
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
const Label = styled.label``;
const Select = styled.select``;
const Option = styled.option``;

export default LimitSelector;
