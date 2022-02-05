import styled from 'styled-components';

export const Container = styled.div<{ list: string }>`
  width: 100%;

  .title {
    font-size: 3rem;
    font-weight: 600;
    padding-top: 2.5rem;
  }

  .listWrapper {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1.5px solid ${({ theme }) => theme.palette.gray3};
  }

  .list {
    padding: 2rem;
    font-size: 1.8rem;
    font-weight: 600;
  }

  .account {
    border-bottom: 3px solid
      ${({ list, theme }) => (list === 'account' ? theme.palette.green : theme.palette.transparency)};
  }

  .alert {
    border-bottom: 3px solid
      ${({ list, theme }) => (list === 'alert' ? theme.palette.green : theme.palette.transparency)};
  }
  .link {
    color: ${({ theme }) => theme.palette.black};
  }
`;
