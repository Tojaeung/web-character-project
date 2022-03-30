import React from 'react';
import getLevel from '@src/utils/exp.util';
import styled from 'styled-components';

interface IProps {
  exp: number;
  nickname: string;
  size: string;
}

function Nickname({ exp, nickname, size }: IProps) {
  return (
    <Container>
      <div className={`nickname ${size}`}>
        <span>[Lv.{getLevel(exp)}]</span>
        <span>{nickname}</span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .nickname {
    display: flex;
    gap: 0.5rem;
    span:nth-child(1) {
      font-weight: 400;
    }

    span:nth-child(2) {
      font-weight: 700;
    }
  }

  .small {
    font-size: 1.5rem;
  }
  .medium {
    font-size: 1.8rem;
  }
  .large {
    font-size: 2.5rem;
  }
`;

export default Nickname;
