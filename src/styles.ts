import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

export const lightTheme: DefaultTheme = {
  maxWidth: '385px',
  borderColor: 'rgba(0,0,0,0.2)',
  fontColor: '#2c2c2c',
  bgColor: '#FAFAFA',
  pointColor: '#ffc426',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px',
  red: 'tomato',
  checkedColor: '#8b4513',
};
export const darkTheme: DefaultTheme = {
  maxWidth: '385px',
  borderColor: 'rgba(0,0,0,0.2)',
  fontColor: '#FAFAFA',
  bgColor: '#2c2c2c',
  pointColor: '#ffc426',
  boxShadow: 'rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
  red: 'tomato',
  checkedColor: '#8b4513',
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
 
  body {
    background-color: ${(props) => props.theme.bgColor};
    color:${(props) => props.theme.fontColor};
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  a {
    text-decoration: none;
    color:inherit;
    cursor: pointer;
  }
  button {
    all:unset;
    cursor: pointer;
  }
  input {
      all:unset;
      box-sizing: border-box;
    }
  * {
  box-sizing: border-box;
  }
`;
