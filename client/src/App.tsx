import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import useSocketSetup from '@src/hook/useSocketSetup';

import PublicRouter from '@src/routes/PublicRouter';
import PrivateRouter from '@src/routes/PrivateRouter';

import Header from '@src/layouts/Header';
import Home from '@src/pages/Home';
import CreatePostForm from '@src/pages/create/PostForm';
import CreateDrawingForm from '@src/pages/create/DrawingForm';
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
import EditPostForm from '@src/pages/edit/PostForm';

function App() {
  useSocketSetup();

  return (
    <BrowserRouter>
      <FullScreen>
        <AppScreen>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:profileId" element={<Profile />} />
            <Route path="/board/:board" element={<Board />} />
            <Route path="/board/:board/post/:postId" element={<Post />} />

            <Route path="/auth" element={<PublicRouter />}>
              <Route path="signUp" element={<SignUp />} />
              <Route path="editPw" element={<EditPw />} />
            </Route>

            <Route path="/" element={<PrivateRouter />}>
              <Route path="settings">
                <Route path="account" element={<Account />} />
                <Route path="alert" element={<Alert />} />
                <Route path="desc" element={<Desc />} />
              </Route>

              <Route path="editPw" element={<EditPw />} />

              <Route path="create">
                <Route path="drawingForm" element={<CreateDrawingForm />} />
                <Route path="postForm/:board" element={<CreatePostForm />} />
              </Route>

              <Route path="edit">
                <Route path="postForm/:postId" element={<EditPostForm />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Modal />
          <Chat />
        </AppScreen>
      </FullScreen>
      )
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
