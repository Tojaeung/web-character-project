import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineMenu, AiOutlineUser, AiOutlineKey } from 'react-icons/ai';
import { MdPlaylistAdd } from 'react-icons/md';
import Profile from './Profile';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import { openModal } from '@src/store/slices/modal.slice';
import logo from '@src/assets/images/logo.jpg';
import Button from '@src/components/Button';

function Header() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  const openLoginModal = async (e: any) => {
    await dispatch(openModal({ mode: 'login' }));
  };

  return (
    <>
      <Container>
        <Logo
          src={logo}
          alt="logo"
          onClick={(e) => {
            navigate('/');
          }}
        />
        <RightSide>
          <ATag href="/board/free">자유게시판</ATag>
          <ATag href="/board/drawingCommission">커미션</ATag>
          <ATag href="/board/drawingRequest">리퀘스트</ATag>
          <ATag href="/board/drawingSale">분양</ATag>
          {user ? (
            <Profile />
          ) : (
            <AuthBox>
              <LoginButton color="green" size="small" onClick={openLoginModal}>
                <UserIcon />
                로그인
              </LoginButton>
              <SignUpButton color="green" size="small" onClick={(e) => navigate('/auth/signUp')}>
                <AddIcon />
                회원가입
              </SignUpButton>
            </AuthBox>
          )}
        </RightSide>
      </Container>
      <Responsive>
        <MenuIcon />
        <Logo
          src={logo}
          alt="logo"
          onClick={(e) => {
            navigate('/');
          }}
        />
        {user ? (
          <Profile />
        ) : (
          <AuthBox>
            <KeyIcon onClick={openLoginModal} />
          </AuthBox>
        )}
      </Responsive>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
  background: ${({ theme }) => theme.palette.bgColor};
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;
const Logo = styled.img`
  cursor: pointer;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
`;

const ATag = styled.a`
  font-size: 1.7rem;
  &:hover {
    text-decoration: underline;
  }
`;
const AuthBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const LoginButton = styled(Button)`
  font-size: 1.2rem;
  padding: 0.5rem;
`;
const SignUpButton = styled(Button)`
  font-size: 1.2rem;
  padding: 0.5rem;
`;
const UserIcon = styled(AiOutlineUser)`
  font-size: 2rem;
`;
const AddIcon = styled(MdPlaylistAdd)`
  font-size: 2rem;
`;

const Responsive = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
    min-height: 5rem;
    background: ${({ theme }) => theme.palette.bgColor};
  }
`;

const MenuIcon = styled(AiOutlineMenu)`
  font-size: 2.5rem;
  cursor: pointer;
`;

const KeyIcon = styled(AiOutlineKey)`
  font-size: 2.5rem;
`;

export default Header;
