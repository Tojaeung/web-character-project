import styled from 'styled-components';

export const Container = styled.div<{ chatOk: boolean }>`
  position: relative;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, chatOk }) => chatOk && theme.palette.gray1};
  cursor: pointer;
  &:hover {
    border: 1px solid ${({ theme }) => theme.palette.gray1};
  }

  .noti {
    position: absolute;
    border-radius: 50%;
    top: 25px;
    left: 30px;
    padding: 0.5rem;
    background-color: red;
  }

  .noti-number {
    color: white;
  }

  .chat-icon {
    font-size: 2.5rem;
  }
`;
