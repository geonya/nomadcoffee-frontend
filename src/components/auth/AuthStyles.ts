import styled from 'styled-components';

export const AuthTitle = styled.h1`
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const AuthFooter = styled.span`
  margin-top: 10px;
  font-size: 13px;
  font-weight: 300;

  a {
    margin-left: 5px;
    text-decoration: underline;
    color: ${(props) => props.theme.pointColor};
  }
`;
