import React from 'react';
import styled, { css } from 'styled-components';
import { v4 } from 'uuid';

interface IProps {
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({ total, page, setPage }: IProps) {
  const pageNum = Math.ceil(total / 20);

  return (
    <Container>
      <PrevButton disabled={page === 1} onClick={(e) => setPage(page - 1)}>
        이전
      </PrevButton>
      {Array(pageNum)
        .fill(0)
        .map((_, index) => (
          <PageButton key={v4()} isSelected={page === index + 1 ? true : false} onClick={(e) => setPage(index + 1)}>
            {index + 1}
          </PageButton>
        ))}
      <NextButton disabled={page === pageNum} onClick={(e) => setPage(page + 1)}>
        다음
      </NextButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`;
const PrevButton = styled.button`
  outline: 0;
  border: 0;
`;
const NextButton = styled.button`
  outline: 0;
  border: 0;
`;
const PageButton = styled.button<{ isSelected: boolean }>`
  outline: 0;
  border: 1px solid ${({ theme }) => theme.palette.black};
  ${({ isSelected }) => {
    if (!isSelected) {
      return css`
        color: ${({ theme }) => theme.palette.black};
        background-color: ${({ theme }) => theme.palette.white};
        cursor: pointer;
      `;
    } else {
      return css`
        color: ${({ theme }) => theme.palette.white};
        background-color: ${({ theme }) => theme.palette.green};
        cursor: revert;
      `;
    }
  }}
`;

export default Pagination;
