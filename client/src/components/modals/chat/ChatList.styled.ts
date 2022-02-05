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
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.palette.gray1};
    }
  }

  .noti {
    background-color: red;
    border-radius: 50%;
    position: absolute;
    padding: 0.3rem;
    top: 2.5rem;
    left: 4rem;
  }

  .noti-number {
    color: white;
  }

  .avatar {
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
