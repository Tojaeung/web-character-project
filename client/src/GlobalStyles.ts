import { createGlobalStyle, css } from 'styled-components';
import { darken } from 'polished';
import { reset } from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    text-decoration: none;
  }
  html {
    font-size: 10px;
  }

  body {
    font-family: Noto Sans KR;  
  }
`;

export default GlobalStyles;

export const greenButtonStyle = css`
  font-weight: 800;
  border-radius: 5px;
  outline: none;
  border: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.white};
  ${({ theme }) => {
    return css`
      background-color: ${theme.palette.green};
      &:hover {
        background-color: ${darken(0.05, theme.palette.green)};
      }
    `;
  }}
`;

export const redButtonStyle = css`
  font-weight: 800;
  border-radius: 5px;
  outline: none;
  border: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.white};
  ${({ theme }) => {
    return css`
      background-color: ${theme.palette.red};
      &:hover {
        background-color: ${darken(0.05, theme.palette.red)};
      }
    `;
  }}
`;

export const greenInputStyle = css`
  border-radius: 5px;
  width: 100%;
  height: 4rem;
  font-size: 1.4rem;
  outline: none;

  border: 2px solid ${({ theme }) => theme.palette.gray2};
  &:focus {
    border: 2px solid ${({ theme }) => theme.palette.green};
  }
  &::placeholder {
    font-size: 1.4rem;
  }
`;
