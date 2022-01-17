import styled from 'styled-components';

interface ChannelType {
  openPaint: boolean;
  openNovel: boolean;
}

export const Container = styled.div<ChannelType>`
  position: fixed;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.palette.white};
  width: 20rem;
  height: calc(100vh - 5.1rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .menu {
    display: flex;
    flex-direction: column;
    &__title {
      font-size: 2rem;
      font-weight: 700;
      padding: 1.5rem;
    }
    &__wrapper {
      font-size: 2rem;
      text-align: center;
      cursor: pointer;
    }
    &__channel {
      padding: 1rem;
      display: flex;
      justify-content: center;
      &-name {
        margin-right: 1rem;
      }
    }
  }
  .dropDown {
    &__li {
      text-align: left;
      padding: 1rem 5rem;
      font-size: 1.7rem;
      &:hover {
        background: ${({ theme }) => theme.palette.gray1};
      }
    }
  }

  .footer {
  }
`;
