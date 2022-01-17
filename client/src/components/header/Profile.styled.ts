import styled from 'styled-components';

export const Container = styled.div<{ openProfile: boolean }>`
  position: relative;
  border-top: 1px solid ${({ theme, openProfile }) => (openProfile ? theme.palette.gray1 : theme.palette.transparency)};
  border-left: 1px solid ${({ theme, openProfile }) =>
    openProfile ? theme.palette.gray1 : theme.palette.transparency};
  border-right: 1px solid ${({ theme, openProfile }) =>
    openProfile ? theme.palette.gray1 : theme.palette.transparency};
  border-radius: 5px 5px 0 0;
  border-bottom: ${({ theme, openProfile }) => openProfile && theme.palette.transparency};

    .profile {
      width: 18rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 0px 1px 1px ${({ theme, openProfile }) =>
          openProfile ? theme.palette.transparency : theme.palette.gray1};
      }
      &__avatar-wrapper {
        width: 5rem;
        height: 5rem;
        overflow: hidden;
      }
      &__avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &__userInfo-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      &__nickname {
        font-size: 1.5rem;
      }
      &__level {
        font-size: 1.5rem;
      }
      &__chevron {
        font-size: 1.5rem;
      }
    }
  }
  .dropDown {
    /* border: 1px solid red; */
    position: absolute;
    width: 18.2rem;
    top: 5rem;
    left: -1px;
    font-size: 1.7rem;
    border-radius: 0 0 5px 5px;
    border-bottom: 1px solid ${({ theme, openProfile }) => openProfile && theme.palette.gray1};
    border-left: 1px solid ${({ theme, openProfile }) => openProfile && theme.palette.gray1};
    border-right: 1px solid ${({ theme, openProfile }) => openProfile && theme.palette.gray1};
    background: ${({ theme }) => theme.palette.white};
    > * {
      padding: 1rem;
    }
    &__userInfo {
      display: flex;
      align-items: center;
      &:hover {
        background: ${({ theme }) => theme.palette.gray1};
        cursor: pointer;
      }
    }
    &__dashboard {
      display: flex;
      align-items: center;
      &:hover {
        background: ${({ theme }) => theme.palette.gray1};
        cursor: pointer;
      }
    }
    &__logout {
      display: flex;
      align-items: center;
      &:hover {
        background: ${({ theme }) => theme.palette.gray1};
        cursor: pointer;
      }
    }
    &__icon {
      font-size: 2.5rem;
      margin-right: 2rem;
    }
  }
`;
