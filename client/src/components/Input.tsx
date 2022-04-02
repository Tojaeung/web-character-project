import { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  color?: 'green';
}

function StyledInput({ color, ...props }: IProps) {
  return <Input {...props} color={color} />;
}

const colorSettings = css<{ color?: string }>`
  ${({ theme, color }) => {
    if (!color) {
      return;
    }
    const selected = theme.palette[color];
    return css`
      &:focus {
        border: 1px solid ${selected};
      }
    `;
  }}
`;

const Input = styled.input<IProps>`
  padding: 0 1rem;
  border-radius: 5px;
  width: 100%;
  min-height: 4rem;
  font-size: 1.4rem;
  outline: none;
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  ${colorSettings};
  &::placeholder {
    font-size: 1.4rem;
  }
`;

export default StyledInput;
