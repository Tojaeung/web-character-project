import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { useRefreshLogin } from '@src/hook/useRefreshLogin';
import { useSocketSetup } from '@src/hook/useSocketSetup';

import { AuthRouter, PrivateRouter } from '@src/routes/PrivateRouter';

import Header from '@src/layouts/Header';
import Home from '@src/pages/Home';
import CreatePostForm from '@src/pages/CreatePostForm';
import CreateDrawingForm from '@src/pages/CreateDrawingForm';
import Modal from '@src/components/modals/Modal';
import Chat from '@src/components/modals/chat';
import Settings from './pages/settings/Settings';
import Profile from '@src/pages/profile/[id]';
import EditPw from '@src/pages/auth/EditPw';
import SignUp from '@src/pages/auth/SignUp';
import Board from '@src/pages/board/[board]';
import Post from '@src/pages/post/[id]';
import NotFound from '@src/components/common/NotFound';

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
              <Route path="settings" element={<Settings />} />
              <Route path="createDrawingForm" element={<CreateDrawingForm />} />
              <Route path="createPostForm/:board" element={<CreatePostForm />} />
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
`;

export default App;
