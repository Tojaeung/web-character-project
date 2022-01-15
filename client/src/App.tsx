import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@src/Theme';
import GlobalStyles from '@src/GlobalStyles';

import { FullScreenDiv, AppScreenDiv } from '@src/styles/App.styled';
import { useAppDispatch } from '@src/redux/app/hook';
import { refreshToken } from '@src/redux/requests/auth.request';

import Header from '@src/components/Header';
import Home from '@src/pages/Home';
import Register from '@src/pages/Register';
import FindPw from '@src/pages/FindPw';
import ChangePw from '@src/pages/ChangePw';

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
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <FullScreenDiv>
          <AppScreenDiv>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/findPw" element={<FindPw />} />
              <Route path="/changePw" element={<ChangePw />} />
            </Routes>
          </AppScreenDiv>
        </FullScreenDiv>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
