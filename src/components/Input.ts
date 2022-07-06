import styled from 'styled-components';

interface InputProps {
  hasError?: boolean;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  border-radius: 3px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid
    ${(props) => (props.hasError ? 'tomato' : props.theme.borderColor)};
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => props.theme.pointColor};
  }
`;
