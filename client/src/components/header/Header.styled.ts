import styled from 'styled-components';
import { greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background: ${({ theme }) => theme.palette.white};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray3};
  z-index: 1000;
  .logo {
    font-size: 2rem;
  }
  .right {
    &__tools {
      display: flex;
      align-items: center;
      > * {
        margin-right: 0.3rem;
      }
    }
    &__login-btn {
      ${greenButtonStyle};
      padding: 1rem;
    }
    &__register-btn {
      ${redButtonStyle}
      padding: 1rem;
    }
  }
`;
