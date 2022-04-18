import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import { lightTheme } from '@src/styles/Theme';
import GlobalStyles from '@src/styles/GlobalStyles';
import App from './App';
import { store } from '@src/store/app/store';

axios.defaults.headers.common['Admin'] = localStorage.getItem('admin')!;
axios.defaults.headers.common['Penalty'] = localStorage.getItem('penalty')!;

ReactDOM.render(
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
