import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 5rem;
  width: 50rem;
  height: 40rem;
  border-radius: 10px;
  box-shadow: 0px 0px 3px 0.5px ${({ theme }) => theme.palette.gray1};
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.white};
`;
export const ListWrapper = styled.div`
  width: 15rem;
  height: 40rem;
  border-right: 1px solid ${({ theme }) => theme.palette.gray1};
`;

export const WindowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 35rem;
  height: 5rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray1};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  > span {
    font-size: 1.5rem;
  }

  .closeIcon {
    font-size: 2.5rem;
    cursor: pointer;
  }
`;

export const Body = styled.div`
  width: 100%;
  height: calc(100% - 10rem);
`;

export const Footer = styled.div`
  margin-bottom: 0.5rem;
`;
