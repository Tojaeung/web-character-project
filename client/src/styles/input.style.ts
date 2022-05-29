import { css } from 'styled-components';

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

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
    &::placeholder {
      font-size: 1.2rem;
    }
  }
`;
export const defaultInputStyle = css`
  border-radius: 5px;
  width: 100%;
  min-height: 4rem;
  font-size: 1.4rem;
  outline: none;
  border: 2px solid ${({ theme }) => theme.palette.gray};
  &::placeholder {
    font-size: 1.4rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
    &::placeholder {
      font-size: 1.2rem;
    }
  }
`;
