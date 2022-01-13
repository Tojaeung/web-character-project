import styled from 'styled-components';
import { greenButtonStyle, greenInputStyle } from '../GlobalStyles';

export const Container = styled.div`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    width: 300px;
    height: 100vh;
    &__title {
      font-size: 3rem;
      text-align: center;
    }
    &__input-wrapper {
      > * {
        margin: 2rem 0;
      }
    }

    &__input {
      position: relative;
    }
    &__input-label {
      font-size: 1.5rem;
      align-self: flex-start;
    }
    &__input-entry {
      ${greenInputStyle}
    }
    &__input-icon {
      position: absolute;
      right: 1.5rem;
      top: 2.5rem;
      font-size: 2rem;
    }
    &__input-errorMessage {
      font-size: 1.3rem;
    }
    &__registerGuide {
      font-size: 1.3rem;
      text-align: center;
    }
    &__submit-btn {
      ${greenButtonStyle}
      width: 100%;
      font-size: 2rem;
      padding: 1rem 0;
    }
  }

  .authEmailGuide {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.8rem;

    &__title {
      font-size: 3rem;
      margin-bottom: 3rem;
    }
    &__text {
      font-weight: 800;
    }
    &__content {
      line-height: 3rem;
      text-align: center;
      margin-bottom: 3rem;
    }
    &__caution {
      color: ${({ theme }) => theme.palette.red};
    }
    &__btn {
      width: 50%;
      font-size: 2rem;
      padding: 1.5rem 0;
      ${greenButtonStyle}
    }
  }
`;
