import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from 'styles/Theme';
import GlobalStyles from 'styles/GlobalStyles';
import App from './App';
import { store } from 'store/app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

ReactDOM.render(
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
