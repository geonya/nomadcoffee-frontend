import styled from 'styled-components';

const SubmitButton = styled.input`
  width: 80%;
  margin: 10px 0;
  border-radius: 3px;
  background-color: ${(props) => props.theme.pointColor};
  color: white;
  text-align: center;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
`;

export default SubmitButton;
