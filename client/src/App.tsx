import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@src/Theme';
import GlobalStyles from '@src/GlobalStyles';

import { FullScreenDiv, AppScreenDiv } from '@src/styles/App.styled';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';

import Header from '@src/components/Header';
import Home from '@src/pages/Home';
import Register from '@src/pages/Register';
import FindPw from '@src/pages/FindPw';
import ChangePw from '@src/pages/ChangePw';

function App() {
  const dispatch = useAppDispatch();

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
