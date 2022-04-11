import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | React.ReactNode;
  color: 'green' | 'red' | 'black';
  size: 'small' | 'medium' | 'large';
  inverse?: boolean;
}

function StyledButton({ children, color, size, inverse, ...props }: IProps) {
  return (
    <Button {...props} color={color} size={size} inverse={inverse || false}>
      {children}
    </Button>
  );
}

const sizeSettions = css<{ size: string }>`
  ${({ size }) =>
    size === 'large' &&
    css`
      padding: 1.5rem 2rem;
      font-size: 1.6rem;
    `}
  ${({ size }) =>
    size === 'medium' &&
    css`
      padding: 1rem;
      font-size: 1.4rem;
    `}
  ${({ size }) =>
    size === 'small' &&
    css`
      padding: 0.5;
      font-size: 1.2rem;
    `}
`;

const colorSettings = css<{ color: string; inverse?: boolean }>`
  ${({ theme, color, inverse }) => {
    const selected = theme.palette[color];
    if (inverse) {
      return css`
        background-color: ${theme.palette.white};
        border: 0.1px solid ${selected};
        color: ${selected};

        &:hover {
          background-color: ${lighten(0.05, theme.palette.white)};
        }
        &:active {
          background-color: ${darken(0.05, theme.palette.white)};
        }
      `;
    } else {
      return css`
        background-color: ${selected};
        border: 0;
        color: ${theme.palette.white};
        &:hover {
          background-color: ${lighten(0.05, selected)};
        }
        &:active {
          background-color: ${darken(0.05, selected)};
        }
      `;
    }
  }}
`;

const Button = styled.button<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  border-radius: 5px;
  white-space: nowrap;
  outline: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.white};
  ${sizeSettions};
  ${colorSettings};
`;

export default StyledButton;
