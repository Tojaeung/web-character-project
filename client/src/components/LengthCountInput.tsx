import { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface IProp extends InputHTMLAttributes<HTMLInputElement> {
  limit: number;
  valueLength: number;
}

function LengthCountInput({ limit, valueLength, ...props }: IProp) {
  return (
    <Container>
      <Input {...props} valueLength={valueLength} limit={limit} />
      <LengthCount valueLength={valueLength} limit={limit}>
        {valueLength} / {limit}
      </LengthCount>
      {valueLength > limit && <ErrorMessage>정해진 글자 수를 초과하였습니다.</ErrorMessage>}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
const Input = styled.input<{ limit: number; valueLength: number }>`
  outline: 0;
  padding: 0 4rem 0 1rem;
  border-radius: 5px;
  width: 100%;
  min-height: 4rem;
  font-size: 1.4rem;
  ${({ theme, limit, valueLength }) => {
    if (valueLength > limit) {
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

const LengthCount = styled.span<{ limit: number; valueLength: number }>`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  ${({ theme, limit, valueLength }) => {
    if (valueLength > limit) {
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
