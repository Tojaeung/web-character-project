import styled from 'styled-components';
import { greenButtonStyle, greenInputStyle } from '../GlobalStyles';

export const Container = styled.div`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  .guide-text-wrapper {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.8rem;
  }
  .guide-text-title {
    font-size: 3rem;
    margin-bottom: 3rem;
  }
  .guide-text-content {
    line-height: 3rem;
    text-align: center;
    margin-bottom: 3rem;
  }
  .guide-text-email {
    font-weight: 800;
  }
  .guide-text-caution {
    color: ${({ theme }) => theme.palette.red};
  }
  .guide-text-button {
    width: 50%;
    font-size: 2rem;
    padding: 1.5rem 0;
    ${greenButtonStyle}
  }
`;
export const Form = styled.form`
  width: 300px;
  height: 100vh;
`;

export const Header = styled.div`
  .logo {
    font-size: 3rem;
    text-align: center;
  }
`;

export const Body = styled.div`
  > * {
    margin: 2rem 0;
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
