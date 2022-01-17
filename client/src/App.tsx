import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme } from '@src/styles/Theme';
import GlobalStyles from '@src/styles/GlobalStyles';

import { useAppDispatch } from '@src/redux/app/hook';
import { refreshToken } from '@src/redux/requests/auth.request';

import Header from '@src/components/header/Header';
import Home from '@src/pages/home';
import PageRender from './PageRender';

const Container = styled.div`
  .fullScreen {
    width: 100%;
    min-height: 100vh;
    overflow-y: auto;
    background-color: ghostwhite;
  }
  .appScreen {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }
`;

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const login = localStorage.getItem('login');
    if (!login) return;
    dispatch(refreshToken())
      .unwrap()
      .then((response) => {
        const { ok } = response;
        if (!ok) {
          localStorage.removeItem('login');
        }
      });
  }, [dispatch]);

  return (
    <Container>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <BrowserRouter>
          <div className="fullScreen">
            <Header />
            <div className="appScreen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:page" element={<PageRender />} />
                <Route path="/:page/:id" element={<PageRender />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Container>
  );
}

export default App;
