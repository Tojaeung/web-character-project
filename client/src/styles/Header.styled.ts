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
`;

export const Logo = styled.div`
  font-size: 2rem;
`;

export const Auth = styled.div`
  .login-button {
    ${greenButtonStyle};
  }
  .register-button {
    ${redButtonStyle}
  }
`;
