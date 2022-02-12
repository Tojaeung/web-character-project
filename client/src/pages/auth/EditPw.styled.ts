import styled from 'styled-components';
import { greenButtonStyle, greenInputStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  .form {
    width: 40rem;
    border: 1px solid ${({ theme }) => theme.palette.gray3};
    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 5px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo {
    font-size: 3rem;
    padding-bottom: 2rem;
  }

  .content {
    align-self: flex-start;
    font-size: 1.8rem;
    line-height: 2rem;
    padding-bottom: 2rem;
  }

  .input-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;
  }
  .label {
    font-size: 1.4rem;
  }

  .input {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    ${greenInputStyle};
  }
  .errorMessage {
    position: absolute;
    top: 6rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.palette.red};
  }
  .submitBtn {
    width: 50%;
    font-size: 1.5rem;
    padding: 1rem 0;
    ${greenButtonStyle};
  }
`;
