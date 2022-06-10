import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

export const lightTheme: DefaultTheme = {
	maxWidth: '385px',
	borderColor: '#2c2c2c',
	fontColor: '#2c2c2c',
	bgColor: '#FAFAFA',
};
export const darkTheme: DefaultTheme = {
	maxWidth: '385px',
	borderColor: '#FAFAFA',
	fontColor: '#FAFAFA',
	bgColor: '#2c2c2c',
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
  }
  a {
    text-decoration: none;
    color:inherit;
  }
  * {
    box-sizing: border-box;
  }
`;
