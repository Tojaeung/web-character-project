import styled from 'styled-components';

export const Container = styled.div<{ openAlert: boolean }>`
  position: relative;
  background: ${({ theme, openAlert }) => openAlert && theme.palette.gray1};

  .alert {
    width: 5rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      border: 1px solid ${({ theme }) => theme.palette.gray1};
    }
    &__icon {
      font-size: 2.5rem;
    }
  }
  .dropDown {
    position: absolute;
    background: ${({ theme }) => theme.palette.white};
    left: -7rem;
    top: 5rem;
    width: 20rem;
    font-size: 1.4rem;
    border-radius: 5px;
    box-shadow: 0px 2px 10px 0.01px ${({ theme }) => theme.palette.gray5};
    &__li-title {
      text-align: left;
      font-weight: 500;
      font-size: 1.5rem;
      padding: 1.5rem;
    }
    &__li {
      padding: 1rem;
      border-bottom: 1px solid ${({ theme }) => theme.palette.gray1};
    }
  }
`;
