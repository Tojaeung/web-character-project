import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { useRefreshLogin } from '@src/hook/useRefreshLogin';
import { useSocketSetup } from '@src/hook/useSocketSetup';

import Header from '@src/components/header/Header';
import Home from '@src/pages/Home';
import { AuthPageRender, ProfilePageRender, DrawingPageRender } from '@src/routes/PageRender';
import { AuthPrivateRouter, PrivateRouter } from '@src/routes/PrivateRouter';

import Modal from '@src/components/modals/Modal';
import ChatModal from '@src/components/modals/chat/Chat.modal';
import Settings from './pages/settings/Settings';

function App() {
  useRefreshLogin();
  useSocketSetup();

  return (
    <Container>
      <BrowserRouter>
        <div className="fullScreen">
          <Header />
          <div className="appScreen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/auth/:page"
                element={
                  <AuthPrivateRouter>
                    <AuthPageRender />
                  </AuthPrivateRouter>
                }
              />

              <Route
                path="/settings"
                element={
                  <PrivateRouter>
                    <Settings />
                  </PrivateRouter>
                }
              />

              <Route
                path="/profile/:profileId"
                element={
                  <PrivateRouter>
                    <ProfilePageRender />
                  </PrivateRouter>
                }
              />

              <Route
                path="/drawing/:page"
                element={
                  <PrivateRouter>
                    <DrawingPageRender />
                  </PrivateRouter>
                }
              />

              <Route path="*" element={<h1>나다호다</h1>} />
            </Routes>
            <Modal />
            <ChatModal />
          </div>
        </div>
      </BrowserRouter>
    </Container>
  );
}

const Container = styled.div`
  .fullScreen {
    width: 100%;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.palette.appBgColor};
  }
  .appScreen {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

export default App;
