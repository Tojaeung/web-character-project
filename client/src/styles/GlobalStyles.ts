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
    background-color: ${({ theme }) => theme.palette.white};
    color: ${({ theme }) => theme.palette.black};
    font-family: Noto Sans KR;  
    a {
      color: ${({ theme }) => theme.palette.black};
    }
    img {
      max-width: 100%;
    }
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.green};
    
  }
  /* ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.palette.gray};
  } */

`;

export default GlobalStyles;

export const greenButtonStyle = css`
  font-weight: 800;
  border-radius: 5px;
  white-space: nowrap;
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
  white-space: nowrap;
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
  min-height: 4rem;
  font-size: 1.4rem;
  outline: none;
  border: 2px solid ${({ theme }) => theme.palette.borderColor};
  &:focus {
    border: 2px solid ${({ theme }) => theme.palette.green};
  }
  &::placeholder {
    font-size: 1.4rem;
  }
`;
export const defaultInputStyle = css`
  border-radius: 5px;
  width: 100%;
  /* min-height: 4rem; */
  font-size: 1.4rem;
  outline: none;
  border: 2px solid ${({ theme }) => theme.palette.gray};
  &::placeholder {
    font-size: 1.4rem;
  }
`;
