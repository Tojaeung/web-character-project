import styled from 'styled-components';
import { greenButtonStyle, greenInputStyle } from '../GlobalStyles';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  width: 300px;
  height: 100vh;
  > * {
    margin: 2rem 0;
  }
`;

export const Header = styled.div`
  .logo {
    font-size: 3rem;
    text-align: center;
  }
`;

export const Body = styled.div`
  > * {
    margin: 3rem 0;
  }
  .input-wrapper {
    position: relative;
  }
  .input-label {
    font-size: 1.5rem;
    align-self: flex-start;
  }
  .input {
    ${greenInputStyle}
  }
  .input-icon {
    position: absolute;
    right: 1.5rem;
    top: 2.5rem;
    font-size: 2rem;
  }
  .error-message {
    font-size: 1.3rem;
  }
  .label-guide-text {
    font-size: 1.3rem;
  }
  .register-guide-text {
    font-size: 1.3rem;
    text-align: center;
  }
`;

export const Footer = styled.div`
  .submit-button {
    ${greenButtonStyle}
    width: 100%;
    font-size: 2rem;
    padding: 1rem 0;
  }
`;
