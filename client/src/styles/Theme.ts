import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  palette: {
    appBgColor: '#f8f8ff',
    bgColor: '#fff',
    shadowColor: '0px 1px 4px rgba(0,0,0,0.15)',
    borderColor: '#dbdbdb',
    black: 'black',
    white: 'white',
    green: '#2eb471',
    red: '#eb144c',
    gray: '#e6e6e6',
  },
  device: {
    mobile: `screen and (max-width: 425px)`,
    tablet: `screen and (max-width: 768px)`,
    laptop: `screen and (max-width: 1024px)`,
  },
};
