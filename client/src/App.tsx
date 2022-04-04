import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { useRefreshLogin } from '@src/hook/useInitPage';
import { useSocketSetup } from '@src/hook/useSocketSetup';

import { AuthRouter, PrivateRouter } from '@src/routes/PrivateRouter';

import Header from '@src/layouts/Header';
import Home from '@src/pages/Home';
import PostForm from '@src/pages/create/PostForm';
import DrawingForm from '@src/pages/create/DrawingForm';
import Modal from '@src/modals/Modal';
import Chat from '@src/modals/chat';
import Profile from '@src/pages/profile/[id]';
import EditPw from '@src/pages/auth/EditPw';
import SignUp from '@src/pages/auth/SignUp';
import Board from '@src/pages/board/[board]';
import Post from '@src/pages/post/[id]';
import NotFound from '@src/components/NotFound';
import Account from './pages/settings/Account';
import Alert from './pages/settings/Alert';
import Desc from './pages/settings/Desc';

function App() {
  useRefreshLogin();
  useSocketSetup();

  return (
    <BrowserRouter>
      <FullScreen>
        <Header />
        <AppScreen>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="profile/:profileId" element={<Profile />} />

            <Route path="/board/:boardName" element={<Board />}>
              <Route path="post/:postId" element={<Post />} />
            </Route>

            <Route path="/auth" element={<AuthRouter />}>
              <Route path="signUp" element={<SignUp />} />
            </Route>

            <Route element={<PrivateRouter />}>
              <Route path="/auth/editPw" element={<EditPw />} />
              <Route path="/settings">
                <Route path="account" element={<Account />} />
                <Route path="alert" element={<Alert />} />
                <Route path="desc" element={<Desc />} />
              </Route>
              <Route path="/editPw" element={<EditPw />} />
              <Route path="/create">
                <Route path="drawingForm" element={<DrawingForm />} />
                <Route path="postForm/:board" element={<PostForm />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Modal />
          <Chat />
        </AppScreen>
      </FullScreen>
    </BrowserRouter>
  );
}

const FullScreen = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.appBgColor};
`;
const AppScreen = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  position: relative;
`;

export default App;
