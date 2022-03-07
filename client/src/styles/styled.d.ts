import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      //NOTE: 타입스크립트에서 객체에 접근하려면 key속성도 지정해야한다.
      [key: string]: string;
      appBgColor: string;
      bgColor: string;
      shadowColor: string;
      borderColor: string;
      black: string;
      white: string;
      green: string;
      red: string;
      gray: string;
    };
    device: {
      mobile: string;
    };
  }
}
