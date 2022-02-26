import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { useRefreshLogin } from '@src/hook/useRefreshLogin';
import { useSocketSetup } from '@src/hook/useSocketSetup';

import Header from '@src/components/header/Header';
import Home from '@src/pages/Home';
import { AuthPageRender, SettingsPageRender, ProfilePageRender } from '@src/routes/PageRender';
import { AuthPrivateRouter, SettingsPrivateRouter, ProfilePrivateRouter } from '@src/routes/PrivateRouter';

import Modal from '@src/components/modals/Modal';
import ChatModal from '@src/components/modals/chat/Chat.modal';

const Container = styled.div`
  .fullScreen {
    width: 100%;
    min-height: 100vh;
    background-color: ghostwhite;
  }
  .appScreen {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }
`;

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
                path="/settings/:page"
                element={
                  <SettingsPrivateRouter>
                    <SettingsPageRender />
                  </SettingsPrivateRouter>
                }
              />

              <Route
                path="/profile/:profileId"
                element={
                  <ProfilePrivateRouter>
                    <ProfilePageRender />
                  </ProfilePrivateRouter>
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

export default App;
