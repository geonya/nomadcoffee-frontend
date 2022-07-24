import styled from 'styled-components';

export const RedButton = styled.button`
  width: 100%;
  margin: 10px 0;
  border-radius: 3px;
  background-color: ${(props) => props.theme.red};
  color: ${(props) => props.theme.white};
  text-align: center;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
export default RedButton;
