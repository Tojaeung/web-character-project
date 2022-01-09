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
            </Routes>
          </AppScreenDiv>
        </FullScreenDiv>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
