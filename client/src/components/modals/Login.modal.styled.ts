import styled from 'styled-components';
import { greenButtonStyle, greenInputStyle } from '@src/styles/GlobalStyles';

export const Container = styled.div`
  .background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
  }
  .form {
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
    &__close-btn {
      font-size: 2.5rem;
      align-self: flex-end;
      cursor: pointer;
    }
    &__title {
      font-size: 3rem;
      margin: 2rem 0;
    }
    &__input-wrapper {
      width: 100%;
      // 모든 자식요소에게 적용되는 선택자
      > * {
        margin: 1rem 0;
      }
    }
    &__input {
      position: relative;
    }
    &__input-entry {
      ${greenInputStyle}
    }
    &__input-icon {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 2rem;
    }
    &__btn-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    &__submit-btn {
      font-size: 2rem;
      padding: 1rem 0;
      ${greenButtonStyle}
    }
    &__rest-btn-wrapper {
      text-align: center;
      margin: 1rem 0;
    }
    &__findPassword-btn {
      font-size: 1.3rem;
      cursor: pointer;
    }
    &__boundary {
      font-size: 1.3rem;
    }
    &__register-btn {
      font-size: 1.3rem;
      cursor: pointer;
    }
  }
`;
