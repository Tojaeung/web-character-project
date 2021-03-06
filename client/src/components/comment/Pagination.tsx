import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { v4 } from 'uuid';

interface IProps {
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({ total, page, setPage }: IProps) {
  // 댓글표시 제한 수
  const limit = 20;
  // 페이지 수 범위
  const pageRange = 5;
  // 전체 페이지 수
  const pageNum = Math.ceil(total / limit);
  // 페이지 수 범위에서 가장 작은 수
  const [minPageLimit, setMinPageLimit] = useState(0);
  // 페이지 수 범위에서 가장 큰 수
  const [maxPageLimit, setMaxPageLimit] = useState(5);

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (page % pageRange === 1) {
      setMinPageLimit(minPageLimit - pageRange);
      setMaxPageLimit(maxPageLimit - pageRange);
    }

    setPage(page - 1);
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (page % pageRange === 0) {
      setMinPageLimit(minPageLimit + pageRange);
      setMaxPageLimit(maxPageLimit + pageRange);
    }
    setPage(page + 1);
  };

  return (
    <>
      {pageNum === 0 ? null : (
        <Container>
          <PrevButton disabled={page === 1} onClick={handlePrev}>
            이전
          </PrevButton>
          {Array(pageNum)
            .fill(0)
            .slice(minPageLimit, maxPageLimit)
            .map((_, index) => (
              <PageButton
                key={v4()}
                isSelected={page === index + minPageLimit + 1 ? true : false}
                onClick={(e) => {
                  setPage(index + minPageLimit + 1);
                }}
              >
                {index + minPageLimit + 1}
              </PageButton>
            ))}
          <NextButton disabled={page === pageNum} onClick={handleNext}>
            다음
          </NextButton>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;
const PrevButton = styled.button`
  padding: 0.5rem;
  font-size: 1.2rem;
  outline: 0;
  border: 0;
  cursor: pointer;
  white-space: nowrap;
`;
const NextButton = styled.button`
  padding: 0.5rem;
  font-size: 1.2rem;
  white-space: nowrap;
  outline: 0;
  border: 0;
  cursor: pointer;
`;
const PageButton = styled.button<{ isSelected: boolean }>`
  outline: 0;
  padding: 0.5rem;
  font-size: 1.2rem;
  border: 1px solid ${({ theme }) => theme.palette.black};
  ${({ isSelected }) => {
    if (!isSelected) {
      return css`
        color: ${({ theme }) => theme.palette.black};
        background-color: ${({ theme }) => theme.palette.white};
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
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
