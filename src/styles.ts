import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

export const lightTheme: DefaultTheme = {
  maxWidth: '385px',
  borderColor: 'rgba(0,0,0,0.2)',
  fontColor: '#2c2c2c',
  bgColor: '#FAFAFA',
  pointColor: '#ffc426',
  boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
  red: 'tomato',
  checkedColor: '#8b4513',
};
export const darkTheme: DefaultTheme = {
  maxWidth: '385px',
  borderColor: 'rgba(255,255,255,0.5)',
  fontColor: '#FAFAFA',
  bgColor: '#2c2c2c',
  pointColor: '#ffc426',
  boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
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
