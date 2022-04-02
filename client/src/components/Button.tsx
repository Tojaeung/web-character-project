import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  color: 'green' | 'red' | 'black';
  size: 'small' | 'medium' | 'large';
  inverse?: boolean;
  responsive?: boolean;
}

function StyledButton({ children, color, size, inverse, responsive, ...props }: IProps) {
  return (
    <Button {...props} color={color} size={size} inverse={inverse || false} responsive={responsive || false}>
      {children}
    </Button>
  );
}

const sizeSettions = css<{ size: string }>`
  ${({ size }) =>
    size === 'large' &&
    css`
      padding: 2rem 4rem;
      font-size: 2rem;
    `}
  ${({ size }) =>
    size === 'medium' &&
    css`
      padding: 1rem 2rem;
      font-size: 1.6rem;
    `}
  ${({ size }) =>
    size === 'small' &&
    css`
      padding: 0.8rem 1.8rem;
      font-size: 1.4rem;
    `}
`;

const responsiveSettings = css<{ size: string; responsive?: boolean }>`
  ${({ size, responsive }) =>
    size === 'large' &&
    responsive &&
    css`
      @media ${({ theme }) => theme.device.mobile} {
        padding: 1rem 2rem;
        font-size: 1.6rem;
      }
    `}
  ${({ size, responsive }) =>
    size === 'medium' &&
    responsive &&
    css`
      @media ${({ theme }) => theme.device.mobile} {
        padding: 0.8rem 1.7rem;
        font-size: 1.4rem;
      }
    `}
  ${({ size, responsive }) =>
    size === 'small' &&
    responsive &&
    css`
      @media ${({ theme }) => theme.device.mobile} {
        padding: 0.5rem 1.5rem;
        font-size: 1.2rem;
      }
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
  font-weight: 700;
  border-radius: 5px;
  white-space: nowrap;
  outline: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.white};
  ${sizeSettions};
  ${colorSettings};
  ${responsiveSettings};
`;

export default StyledButton;
