import styled from 'styled-components';
import { redButtonStyle, greenInputStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div<{ confirmText: string }>`
  .delAccount {
    width: 400px;
    height: 300px;
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.palette.white};
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: 10px;
  }

  .closeBtn {
    align-self: flex-end;
    font-size: 2.5rem;
    cursor: pointer;
  }

  .title {
    align-self: flex-start;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .caution-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    border-top: 1px solid ${({ theme }) => theme.palette.red};
    border-bottom: 1px solid ${({ theme }) => theme.palette.red};
    background-color: ${({ theme }) => theme.palette.pink1};
    margin-bottom: 2rem;
  }

  .caution-icon {
    font-size: 3rem;
    margin: 1rem;
  }
  .guide {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    span {
      font-size: 1.8rem;
      font-weight: 700;
    }
  }
  .input {
    ${greenInputStyle};
    margin-bottom: 2rem;
  }
  .btn {
    ${({ confirmText }) => {
      if (confirmText !== '계정탈퇴') {
        return null;
      }
      return redButtonStyle;
    }}
    padding: 0.5rem;
    width: 70%;
  }
`;
