import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function TabMenu() {
  return (
    <>
      <Container>
        <SettingsLink to="/settings/account">계정설정</SettingsLink>
        <SettingsLink to="/settings/notification">알림</SettingsLink>
        <SettingsLink to="/settings/desc">자기소개</SettingsLink>
        <SettingsLink to="/settings/my-posts">내가 쓴 글</SettingsLink>
        <SettingsLink to="/settings/my-comments">내가 쓴 댓글</SettingsLink>
      </Container>

      <Responsive>
        <SettingsLink to="/settings/account">
          <Menu>계정설정</Menu>
        </SettingsLink>
        <SettingsLink to="/settings/notification">
          <Menu>알림</Menu>
        </SettingsLink>
        <SettingsLink to="/settings/desc">
          <Menu>자기소개</Menu>
        </SettingsLink>
        <SettingsLink to="/settings/my-posts">
          <Menu>내가 쓴 글</Menu>
        </SettingsLink>
        <SettingsLink to="/settings/my-comments">
          <Menu>내가 쓴 댓글</Menu>
        </SettingsLink>
      </Responsive>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 5rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.bgColor};
  border-bottom: 3px solid ${({ theme }) => theme.palette.gray};
  @media ${({ theme }) => theme.device.tablet} {
    gap: 2rem;
    padding: 1rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
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
      top: 3.7rem;
      background-color: ${({ theme }) => theme.palette.green};
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.7rem;
    &.active {
      &:before {
        top: 2.8rem;
      }
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    &.active {
      &:before {
        display: none;
      }
    }
  }
`;

const Responsive = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const Menu = styled.div`
  padding: 1rem;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.palette.white};
  border: 1px solid ${({ theme }) => theme.palette.black};
`;
export default TabMenu;
