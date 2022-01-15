import styled from 'styled-components';
import { greenButtonStyle, redButtonStyle } from '@src/GlobalStyles';

export const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding: 2rem;
  .logo {
    font-size: 2rem;
  }
  .right {
    &__login-btn {
      ${greenButtonStyle};
    }
    &__register-btn {
      ${redButtonStyle}
    }
    &__logout-btn {
      ${redButtonStyle}
    }
  }
`;
