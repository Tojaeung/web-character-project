import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import useRefreshLogin from 'hooks/useRefreshLogin';
import useSocketSetup from 'hooks/useSocketSetup';

import PublicRouter from 'routes/PublicRouter';
import PrivateRouter from 'routes/PrivateRouter';

import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import Home from 'pages/Home';
import CreatePostForm from 'pages/create/PostForm';
import CreateDrawingForm from 'pages/create/DrawingForm';
import Modal from 'components/Modal';
import Chat from 'components/modals/chat';
import Profile from 'pages/profile/[id]';
import ResetPw from 'pages/ResetPw';
import SignUp from 'pages/SignUp';
import Board from 'pages/board/[board]';
import Post from 'pages/post/[id]';
import NotFound from 'components/NotFound';
import Account from 'pages/settings/Account';
import Notification from 'pages/settings/Notification';
import Desc from 'pages/settings/Desc';
import EditPostForm from 'pages/edit/PostForm';
import MyPosts from 'pages/settings/MyPosts';
import MyComments from 'pages/settings/MyComments';

function App() {
  useSocketSetup();
  useRefreshLogin();

  return (
    <BrowserRouter>
      <FullScreen>
        <AppScreen>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:profileId" element={<Profile />} />
            <Route path="/:board" element={<Board />} />
            <Route path="/:board/:postId" element={<Post />} />

            <Route path="/" element={<PublicRouter />}>
              <Route path="signUp" element={<SignUp />} />
              <Route path="resetPw" element={<ResetPw />} />
            </Route>

            <Route path="/" element={<PrivateRouter />}>
              <Route path="settings">
                <Route path="account" element={<Account />} />
                <Route path="notification" element={<Notification />} />
                <Route path="desc" element={<Desc />} />
                <Route path="my-posts" element={<MyPosts />} />
                <Route path="my-comments" element={<MyComments />} />
              </Route>

              <Route path="create">
                <Route path="drawingForm" element={<CreateDrawingForm />} />
                <Route path="postForm/:board" element={<CreatePostForm />} />
              </Route>

              <Route path="edit">
                <Route path="postForm/:board/:postId" element={<EditPostForm />} />
              </Route>
            </Route>

            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Modal />
          <Chat />
          <Footer />
        </AppScreen>
      </FullScreen>
    </BrowserRouter>
  );
}

const FullScreen = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.appBgColor};
`;
const AppScreen = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  position: relative;
`;

export default App;
