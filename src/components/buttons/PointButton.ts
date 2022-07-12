import styled from 'styled-components';

const PointButton = styled.button`
  font-size: 12px;
  width: 50%;
  margin: 3px 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.fontColor};
  text-align: center;
  padding: 6px 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

export default PointButton;
