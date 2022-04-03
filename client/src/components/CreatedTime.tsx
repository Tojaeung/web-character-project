import relativeTime from '@src/utils/date.util';
import styled from 'styled-components';

interface IProp {
  createdTime: Date;
  size: string;
}

function CreatedTime({ createdTime, size }: IProp) {
  return <Date size={size}>{relativeTime(createdTime)}</Date>;
}

const Date = styled.span<{ size: string }>`
  font-size: ${(prop) => {
    if (prop.size === 'small') {
      return '1.1rem';
    } else if (prop.size === 'medium') {
      return '1.3rem';
    } else if (prop.size === 'large') {
      return '1.5rem';
    }
  }};
`;

export default CreatedTime;
