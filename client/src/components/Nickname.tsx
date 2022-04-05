import getLevel from '@src/utils/exp.util';
import styled, { css } from 'styled-components';

interface IProps {
  exp: number;
  nickname: string;
  size: 'small' | 'medium' | 'large';
}

function Nickname({ exp, nickname, size }: IProps) {
  return (
    <Container>
      <Level>[Lv.{getLevel(exp)}]</Level>
      <NickNameTag size={size}>{nickname}</NickNameTag>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Level = styled.span`
  font-weight: 500;
`;
const NickNameTag = styled.span<{ size: string }>`
  font-weight: 700;
  ${({ size }) => {
    if (size === 'small') {
      return css`
        font-size: 1.4rem;
      `;
    } else if (size === 'medium') {
      return css`
        font-size: 1.6rem;
      `;
    } else if (size === 'large') {
      return css`
        font-size: 1.8rem;
      `;
    }
  }}
`;

export default Nickname;
