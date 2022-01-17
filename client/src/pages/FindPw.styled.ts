import styled from 'styled-components';
import { greenButtonStyle, greenInputStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > * {
      margin-bottom: 2rem;
    }
    &__logo {
      font-size: 3rem;
    }
    &__text {
      text-align: center;
      font-size: 1.5rem;
      line-height: 2rem;
    }
    &__input {
      ${greenInputStyle}
    }
    &__errorMessage {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.palette.red};
    }
    &__btn {
      width: 70%;
      font-size: 1.5rem;
      padding: 1rem 0;
      ${greenButtonStyle};
    }
  }
`;
