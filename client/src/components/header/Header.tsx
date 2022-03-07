import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineMenu, AiOutlineKey, AiOutlineSearch, AiOutlineHome } from 'react-icons/ai';
import Profile from './Profile';
import Alert from './Alert';
import Chat from './Chat';
import Search from './Search';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { openModal } from '@src/redux/slices/modal.slice';
import { greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';

function Header() {
  const dispatch = useAppDispatch();

  const openSearchModal = async (e: React.MouseEvent<SVGElement>) => {
    await dispatch(openModal({ mode: 'search' }));
  };

  const user = useAppSelector(selectAuthUser);

  const openLoginModal = async (e: any) => {
    await dispatch(openModal({ mode: 'login' }));
  };

  return (
    <Container>
      <AiOutlineMenu className="hamburger-icon" />
      <div className="logo">케어펜슬</div>

      <div className="search">
        <Search />
      </div>
      <div className="icons">
        <AiOutlineSearch className="search-icon" onClick={openSearchModal} />
        {!user && <AiOutlineKey className="login-icon" onClick={openLoginModal} />}
      </div>

      {user ? (
        <>
          <div className="tools">
            <Link to="/">
              <AiOutlineHome className="home-icon" />
            </Link>

            <Chat />
            <Alert />
            <Profile />
          </div>
        </>
      ) : (
        <>
          <div className="btns">
            <button className="login-btn" onClick={openLoginModal}>
              로그인
            </button>

            <Link to="/auth/register">
              <button className="register-btn">회원가입</button>
            </Link>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
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
  z-index: 1000;
  min-height: 5rem;
  margin-bottom: 1rem;
  .hamburger-icon {
    display: none;
  }
  .logo {
  }

  .search {
    width: 100%;
  }

  .icons {
    display: none;
    .search-icon {
      font-size: 2.5rem;
      cursor: pointer;
    }
    .login-icon {
      font-size: 2.5rem;
      color: ${({ theme }) => theme.palette.black};
      cursor: pointer;
    }
  }

  .tools {
    display: flex;
    align-items: center;
    gap: 1rem;
    .home-icon {
      display: none;
    }
  }

  .btns {
    display: flex;
    gap: 0.5rem;

    .login-btn {
      ${greenButtonStyle};
      font-size: 1.2rem;
      padding: 1rem;
      white-space: nowrap;
    }
    .register-btn {
      ${redButtonStyle}
      font-size: 1.2rem;
      padding: 1rem;
      white-space: nowrap;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    .hamburger-icon {
      display: block;
      font-size: 2.5rem;
      cursor: pointer;
    }

    .search {
      display: none;
    }

    .icons {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .tools {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0.5rem 2rem;
      border-top: 1px solid ${({ theme }) => theme.palette.borderColor};
      background-color: ${({ theme }) => theme.palette.white};
      .home-icon {
        display: block;
        font-size: 2.5rem;
        color: ${({ theme }) => theme.palette.black};
        cursor: pointer;
      }
    }

    .btns {
      display: none;
    }
  }
`;

export default Header;
