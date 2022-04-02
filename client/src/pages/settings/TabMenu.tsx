import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function TabMenu() {
  return (
    <Container>
      <SettingsLink to="/settings/account">계정설정</SettingsLink>
      <SettingsLink to="/settings/alert">알림</SettingsLink>
      <SettingsLink to="/settings/desc">자기소개</SettingsLink>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 5rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.bgColor};
  border-bottom: 3px solid ${({ theme }) => theme.palette.gray};
  @media ${({ theme }) => theme.device.mobile} {
    gap: 2rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    gap: 1.5rem;
  }
`;
const SettingsLink = styled(NavLink)`
  position: relative;
  font-size: 2rem;
  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: bold;
    color: ${({ theme }) => theme.palette.green};
    text-decoration: none;
    &:before {
      content: '';
      display: block;
      height: 0.3rem;
      width: 100%;
      position: absolute;
      top: 4rem;
      background-color: ${({ theme }) => theme.palette.green};
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.7rem;
    &.active {
      &:before {
        top: 3.7rem;
      }
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
    &.active {
      &:before {
        top: 3.5rem;
      }
    }
  }
`;

export default TabMenu;
