import relativeTime from '@src/utils/date.util';
import styled from 'styled-components';

interface IProp {
  createdTime: Date;
  size: string;
}

function CreatedTime({ createdTime, size }: IProp) {
  return <StyledSpan size={size}>{relativeTime(createdTime)}</StyledSpan>;
}

const StyledSpan = styled.span<{ size: string }>`
  font-size: ${(prop) => {
    if (prop.size === 'small') {
      return '1rem';
    } else if (prop.size === 'medium') {
      return '1.5rem';
    } else if (prop.size === 'large') {
      return '1,7rem';
    }
  }};
`;

export default CreatedTime;
