import { css } from 'styled-components';
import { lighten, darken } from 'polished';

export const greenButtonStyle = css`
  font-weight: 700;
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
        background-color: ${lighten(0.05, theme.palette.green)};
      }
      &:active {
        background-color: ${darken(0.05, theme.palette.green)};
      }
    `;
  }}
`;

export const redButtonStyle = css`
  font-weight: 700;
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
        background-color: ${lighten(0.05, theme.palette.red)};
      }
      &:active {
        background-color: ${darken(0.05, theme.palette.red)};
      }
    `;
  }}
`;

export const inverseGreenButtonStyle = css`
  font-weight: 700;
  border-radius: 5px;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.white};
  ${({ theme }) => {
    return css`
      color: ${theme.palette.green};
      border: 1px solid ${theme.palette.green};
      &:hover {
        color: ${theme.palette.green};
        border: 1px solid ${theme.palette.green};
      }
      &:active {
        color: ${theme.palette.green};
        border: 1px solid ${theme.palette.green};
      }
    `;
  }}
`;

export const inverseRedButtonStyle = css`
  font-weight: 700;
  border-radius: 5px;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.white};
  ${({ theme }) => {
    return css`
      color: ${theme.palette.red};
      border: 1px solid ${theme.palette.red};
      &:hover {
        color: ${theme.palette.red};
        border: 1px solid ${theme.palette.red};
      }
      &:active {
        color: ${theme.palette.red};
        border: 1px solid ${theme.palette.red};
      }
    `;
  }}
`;

export const inverseBlackButtonStyle = css`
  font-weight: 700;
  border-radius: 5px;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.white};
  ${({ theme }) => {
    return css`
      color: ${theme.palette.black};
      border: 1px solid ${theme.palette.black};
      &:hover {
        color: ${theme.palette.black};
        border: 1px solid ${theme.palette.black};
      }
      &:active {
        color: ${theme.palette.black};
        border: 1px solid ${theme.palette.black};
      }
    `;
  }}
`;
