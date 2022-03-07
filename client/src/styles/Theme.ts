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
    mobile: `screen and (max-width: 768px)`,
  },
};

// export const darkTheme: DefaultTheme = {
//   borderColor: '#FFFFFF',
//   backgroundColor: '#000000',
//   fontColor: '#FFFFFF',
//   palette: {
//     green: '#2eb471',
//     red: '#eb144c',
//     blue1: '#1273de',
//     blue2: '#004dcf',
//     skyblue1: '#e1e9f0',
//     skyblue2: '#c4def6',
//     skyblue3: '#bed3f3',
//     white: '#FFFFFF',
//     gray1: '#e6e6e6',
//     gray2: '#dbdbdb',
//     gray3: '#cccccc',
//     gray4: '#b3b3b3',
//     gray5: '#999999',
//     gray6: '#808080',
//     gray7: '#666666',
//     black: '#000000',
// transparency: '#fffff',
//   },
//   device: {
//     mobile: `screen and (max-width: ${deviceSizes.mobile})`,
//     tablet: `screen and (max-width: ${deviceSizes.tablet})`,
//   },
// };
