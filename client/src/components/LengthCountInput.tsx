import { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface IProp extends InputHTMLAttributes<HTMLInputElement> {
  length: number;
}

function LengthCountInput({ length, ...props }: IProp) {
  const limit = 50;
  return (
    <Container>
      <Input {...props} length={length} limit={limit} />
      <LengthCount length={length} limit={limit}>
        {length} / {limit}
      </LengthCount>
      {length > limit && <ErrorMessage>정해진 글자 수를 초과하였습니다.</ErrorMessage>}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
const Input = styled.input<{ limit: number; length: number }>`
  outline: 0;
  padding: 0 4rem 0 1rem;
  border-radius: 5px;
  width: 100%;
  min-height: 4rem;
  font-size: 1.4rem;
  ${({ theme, limit, length }) => {
    if (length > limit) {
      return css`
        border: 1px solid ${theme.palette.red};
      `;
    } else {
      return css`
        border: 1px solid ${theme.palette.borderColor};
      `;
    }
  }}
`;

const LengthCount = styled.span<{ limit: number; length: number }>`
  position: absolute;
  top: 1.3rem;
  right: 1rem;
  ${({ theme, limit, length }) => {
    if (length > limit) {
      return css`
        color: ${theme.palette.red};
      `;
    } else {
      return css`
        color: ${theme.palette.black};
      `;
    }
  }}
`;

const ErrorMessage = styled.p`
  position: absolute;
  bottom: -1.5rem;
  color: ${({ theme }) => theme.palette.red};
  font-size: 1.3rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.1rem;
  }
`;

export default LengthCountInput;
