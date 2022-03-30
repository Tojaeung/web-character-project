import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
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
      [key: string]: string;
      mobile: string;
      tablet: string;
      laptop: string;
    };
  }
}
