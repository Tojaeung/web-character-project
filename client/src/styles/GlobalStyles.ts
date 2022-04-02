import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    text-decoration: none;
  }
  
  html {
    font-size: 62.5%;
  }

  body {
    background-color: ${({ theme }) => theme.palette.white};
    color: ${({ theme }) => theme.palette.black};
    font-family: 'Noto Sans KR', sans-serif;
  
    h1 { 
        font-weight: bold;
        font-size: 3rem;
        @media ${({ theme }) => theme.device.mobile} {
          font-size: 2.5rem;
        }
    }
    h2 { 
        font-weight: 700;
        font-size: 2.2rem;
        @media ${({ theme }) => theme.device.mobile} {
          font-size: 2rem;
        }
        
    }
    h3 { 
        font-weight: 600;
        font-size: 1.8rem;
        @media ${({ theme }) => theme.device.mobile} {
          font-size: 1.5rem;
        }
    }
    p {
      font-size: 1.6rem;
      @media ${({ theme }) => theme.device.mobile} {
          font-size: 1.4rem;
        }
    }
    label {
      font-size: 1.5rem;
      @media ${({ theme }) => theme.device.mobile} {
          font-size: 1.3rem;
        }
    }
    input {
      font-size: 1.4rem;
      @media ${({ theme }) => theme.device.mobile} {
          font-size: 1.3rem;
        }
    }

    span {
      font-size: 1.4rem;
      @media ${({ theme }) => theme.device.mobile} {
          font-size: 1.3rem;
        }
    }

  strong {
    font-weight: 700;
  }
  em {
    font-style: italic;
  }
  u {
    text-decoration: underline;
  }
  s {
    text-decoration: line-through;
  }
  i {
    font-weight: bold;
  }

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

// export const greenButtonStyle = css`
//   font-weight: 800;
//   border-radius: 5px;
//   white-space: nowrap;
//   outline: none;
//   border: 0;
//   cursor: pointer;
//   color: ${({ theme }) => theme.palette.white};
//   ${({ theme }) => {
//     return css`
//       background-color: ${theme.palette.green};
//       &:hover {
//         background-color: ${darken(0.05, theme.palette.green)};
//       }
//     `;
//   }}
// `;

// export const redButtonStyle = css`
//   font-weight: 800;
//   border-radius: 5px;
//   white-space: nowrap;
//   outline: none;
//   border: 0;
//   cursor: pointer;
//   color: ${({ theme }) => theme.palette.white};
//   ${({ theme }) => {
//     return css`
//       background-color: ${theme.palette.red};
//       &:hover {
//         background-color: ${darken(0.05, theme.palette.red)};
//       }
//     `;
//   }}
// `;
// export const greenInputStyle = css`
//   border-radius: 5px;
//   width: 100%;
//   min-height: 4rem;
//   font-size: 1.4rem;
//   outline: none;
//   border: 2px solid ${({ theme }) => theme.palette.borderColor};
//   &:focus {
//     border: 2px solid ${({ theme }) => theme.palette.green};
//   }
//   &::placeholder {
//     font-size: 1.4rem;
//   }
// `;
// export const defaultInputStyle = css`
//   border-radius: 5px;
//   width: 100%;
//   /* min-height: 4rem; */
//   font-size: 1.4rem;
//   outline: none;
//   border: 2px solid ${({ theme }) => theme.palette.gray};
//   &::placeholder {
//     font-size: 1.4rem;
//   }
// `;
