import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

export const lightTheme: DefaultTheme = {
	maxWidth: '385px',
	borderColor: '#2c2c2c',
	fontColor: '#2c2c2c',
	bgColor: '#FAFAFA',
	pointColor: '#8e44ad',
	boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px',
};
export const darkTheme: DefaultTheme = {
	maxWidth: '385px',
	borderColor: '#FAFAFA',
	fontColor: '#FAFAFA',
	bgColor: '#2c2c2c',
	pointColor: '#8e44ad',
	boxShadow: 'rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input {
      all:unset;
      box-sizing: border-box;
    }
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
  }
  * {
    box-sizing: border-box;
  }
  button {
    all:unset;
    cursor: pointer;
  }
`;
