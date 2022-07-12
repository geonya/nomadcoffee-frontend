import styled from 'styled-components';

const SubmitButton = styled.input`
  width: 100%;
  margin: 10px 0;
  border-radius: 3px;
  background-color: ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.bgColor};
  text-align: center;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

export default SubmitButton;
