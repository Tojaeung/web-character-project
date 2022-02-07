import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      //NOTE: 타입스크립트에서 객체에 접근하려면 key속성도 지정해야한다.
      [key: string]: string;
      green: string;
      red: string;
      blue1: string;
      blue2: string;
      skyblue1: string;
      skyblue2: string;
      skyblue3: string;
      white: string;
      gray1: string;
      gray2: string;
      gray3: string;
      gray4: string;
      gray5: string;
      gray6: string;
      gray7: string;
      pink1: string;
      pink2: string;
      black: string;
      yellow1: string;
      yellow2: string;
      yellow3: string;
      transparency: string;
    };
    device: {
      mobile: string;
      tablet: string;
    };
  }
}
