import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@src/styles/Theme';
import GlobalStyles from '@src/styles/GlobalStyles';
import App from './App';
import '@src/fonts/font.css';
import { store } from '@src/redux/app/store';

ReactDOM.render(
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
