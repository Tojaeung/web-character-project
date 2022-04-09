import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineMenu, AiOutlineKey, AiOutlineSearch, AiOutlineHome } from 'react-icons/ai';
import Profile from './Profile';
import Alert from './Alert';
import Chat from './Chat';
import Search from './Search';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { openModal } from '@src/store/slices/modal.slice';
import logo from '@src/assets/images/logo.jpg';
import Button from '@src/components/Button';

function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  const [showSearch, setShowSearch] = useState(false);

  const openLoginModal = async (e: any) => {
    await dispatch(openModal({ mode: 'login' }));
  };

  return (
    <>
      <Container>
        <Link to="/">
          <img src={logo} alt="펜슬힐러" />
        </Link>

        <SearchBox>
          <Search setShowSearch={setShowSearch} />
        </SearchBox>

        {user ? (
          <ToolsBox>
            <Chat />
            <Alert />
            <Profile />
          </ToolsBox>
        ) : (
          <ButtonBox>
            <LoginButton color="black" size="small" inverse={true} responsive={true} onClick={openLoginModal}>
              로그인
            </LoginButton>

            <Link to="/auth/signUp">
              <SignUpButton color="green" size="small" responsive={true}>
                회원가입
              </SignUpButton>
            </Link>
          </ButtonBox>
        )}
      </Container>
      <Responsive>
        {showSearch ? (
          <Search setShowSearch={setShowSearch} />
        ) : (
          <>
            <MenuIcon />
            <Link to="/">
              <img src={logo} alt="펜슬힐러" />
            </Link>
            <IconBox>
              <SearchIcon onClick={(e) => setShowSearch(true)} />
              {!user && <KeyIcon onClick={openLoginModal} />}
            </IconBox>
          </>
        )}

        {user && (
          <ToolsBox>
            <Link to="/">
              <HomeIcon />
            </Link>

            <Chat />
            <Alert />
            <Profile />
          </ToolsBox>
        )}
      </Responsive>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  position: sticky;
  gap: 0.5rem;
  top: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
  background: ${({ theme }) => theme.palette.bgColor};
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
  min-height: 5rem;

  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const MenuIcon = styled(AiOutlineMenu)`
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2.5rem;
    cursor: pointer;
  }
`;
const SearchIcon = styled(AiOutlineSearch)``;
const KeyIcon = styled(AiOutlineKey)``;
const HomeIcon = styled(AiOutlineHome)`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    font-size: 2.5rem;
    color: ${({ theme }) => theme.palette.black};
    cursor: pointer;
  }
`;
const IconBox = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.palette.black};
  }
`;

const SearchBox = styled.div`
  width: 100%;
  display: block;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
const ToolsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  @media ${({ theme }) => theme.device.mobile} {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 2rem;
    z-index: 1010;
    border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
    background-color: ${({ theme }) => theme.palette.white};
  }
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const LoginButton = styled(Button)`
  white-space: nowrap;
`;
const SignUpButton = styled(Button)`
  white-space: nowrap;
`;

const Responsive = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
    min-height: 5rem;
    background: ${({ theme }) => theme.palette.bgColor};
  }
`;

export default Header;
