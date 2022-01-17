import styled from 'styled-components';

export const Container = styled.div<{ openChat: boolean }>`
  .chat {
    width: 5rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme, openChat }) => openChat && theme.palette.gray1};
    cursor: pointer;
    &:hover {
      border: 1px solid ${({ theme }) => theme.palette.gray1};
    }
    &__icon {
      font-size: 2.5rem;
    }
  }
  .chatBot {
    position: fixed;
    bottom: 0;
    right: 5rem;
    width: 50rem;
    height: 40rem;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0.5px ${({ theme }) => theme.palette.gray1};
    display: flex;
    justify-content: space-between;
    background: ${({ theme }) => theme.palette.white};
    &__list {
      width: 15rem;
      height: 40rem;
      border-right: 1px solid ${({ theme }) => theme.palette.gray1};
    }
    &__wrapper {
      display: flex;
      flex-direction: column;
    }
    &__title {
      width: 35rem;
      height: 5rem;
      border-bottom: 1px solid ${({ theme }) => theme.palette.gray1};
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      &-nickname {
        font-size: 1.5rem;
      }
      &-closeBtn {
        font-size: 2rem;
        cursor: pointer;
      }
    }
    &__talk {
      width: 35rem;
      height: 35rem;
    }
  }
`;
