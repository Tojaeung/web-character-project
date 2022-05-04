import relativeTime from '@src/utils/date.util';
import styled from 'styled-components';

interface IProp {
  createdTime: Date;
  fontSize: number;
}

function CreatedTime({ createdTime, fontSize }: IProp) {
  return <Date fontSize={fontSize}>{relativeTime(createdTime)}</Date>;
}

const Date = styled.span<{ fontSize: number }>`
  white-space: nowrap;
  font-size: ${({ fontSize }) => `${fontSize}rem`};
`;

export default CreatedTime;
