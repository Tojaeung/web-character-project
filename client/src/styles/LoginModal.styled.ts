import styled from 'styled-components';
import { greenButtonStyle, greenInputStyle } from '@src/GlobalStyles';

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

export const Form = styled.form`
  width: 320px;
  height: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 10px;
  .modal-close-button {
    font-size: 2.5rem;
    align-self: flex-end;
    cursor: pointer;
  }
  // 모든 자식요소에게 적용되는 선택자
  > * {
    margin: 1rem 0;
  }
`;

export const Header = styled.div`
  font-size: 3rem;
`;
export const Body = styled.div`
  width: 100%;
  // 모든 자식요소에게 적용되는 선택자
  > * {
    margin: 0.5rem 0;
  }

  .input-wrapper {
    position: relative;
  }

  .login-email-input {
    ${greenInputStyle}
  }
  .login-email-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
  }

  .login-password-input {
    ${greenInputStyle}
  }

  .login-password-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
  }
`;
export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .login-button {
    font-size: 2rem;
    padding: 1rem 0;
    ${greenButtonStyle}
  }
  .modal-rest-wrapper {
    text-align: center;
    margin: 1rem 0;
  }

  .find-password-button {
    font-size: 1.3rem;
    cursor: pointer;
  }
  .boundary {
    font-size: 1.3rem;
  }
  .register-button {
    font-size: 1.3rem;
    cursor: pointer;
  }
`;
