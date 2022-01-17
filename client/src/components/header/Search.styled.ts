import styled from 'styled-components';
import { greenInputStyle } from '../../styles/GlobalStyles';

export const Container = styled.div`
  width: 100%;
  padding: 0 2rem;
  .search {
    position: relative;
    &__icon {
      position: absolute;
      top: 0.8rem;
      left: 1.5rem;
      font-size: 2.5rem;
    }
    &__XIcon {
      font-size: 2rem;
      cursor: pointer;
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
    &__input {
      padding: 0 5rem;
      ${greenInputStyle};
    }
  }
`;
