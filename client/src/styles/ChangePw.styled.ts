import styled from 'styled-components';
import { greenButtonStyle, greenInputStyle } from '@src/GlobalStyles';

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
    &__guideText {
      text-align: center;
      font-size: 1.5rem;
      line-height: 2rem;
    }
    &__input-wrapper {
      width: 100%;
    }
    &__input {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
    &__input-label {
      font-size: 1.5rem;
    }
    &__input-entry {
      ${greenInputStyle};
    }
    &__errorMessage {
      font-size: 1.2rem;
    }
    &__submit-btn {
      width: 100%;
      font-size: 1.5rem;
      padding: 1rem 0;
      ${greenButtonStyle}
    }
  }
`;
