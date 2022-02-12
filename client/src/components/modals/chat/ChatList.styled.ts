import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .wrapper {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    cursor: pointer;
    border-radius: 5px;
    text-overflow: ellipsis;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 1rem;
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.palette.gray3};
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.palette.gray5};
    }
    &:hover {
      background-color: ${({ theme }) => theme.palette.gray1};
    }
  }

  .noti-wrapper {
    background-color: red;
    border-radius: 100%;
    position: absolute;
    padding: 0.3rem;
    top: 2.7rem;
    left: 3.2rem;
  }

  .noti-number {
    color: white;
  }

  .avatar-wrapper {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1rem;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .nickname {
    font-size: 1.5rem;
  }
`;
