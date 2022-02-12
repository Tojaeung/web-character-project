import styled from 'styled-components';

export const Container = styled.div<{ list: string | undefined }>`
  width: 100%;
  margin-bottom: 3rem;
  .title {
    font-size: 3rem;
    font-weight: 600;
    padding-top: 2.5rem;
  }

  .list-wrapper {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1.5px solid ${({ theme }) => theme.palette.gray3};
  }

  .list {
    padding: 2rem;
    font-size: 1.8rem;
  }

  .account {
    border-bottom: 3px solid
      ${({ list, theme }) => (list === 'account' ? theme.palette.green : theme.palette.transparency)};
    font-weight: ${({ list }) => list === 'account' && '700'};
    cursor: pointer;
  }

  .description {
    border-bottom: 3px solid
      ${({ list, theme }) => (list === 'description' ? theme.palette.green : theme.palette.transparency)};
    font-weight: ${({ list }) => list === 'description' && '700'};
    cursor: pointer;
  }

  .alert {
    border-bottom: 3px solid
      ${({ list, theme }) => (list === 'alert' ? theme.palette.green : theme.palette.transparency)};
    font-weight: ${({ list }) => list === 'alert' && '700'};
    cursor: pointer;
  }
`;
