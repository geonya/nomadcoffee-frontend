import styled from 'styled-components';

interface AuthInputProps {
	hasError?: boolean;
}

const AuthInput = styled.input<AuthInputProps>`
	width: 100%;
	border-radius: 3px;
	padding: 10px;
	margin: 10px 0;
	border: 0.5px solid
		${(props) => (props.hasError ? 'tomato' : props.theme.borderColor)};
	&::placeholder {
		font-size: 12px;
	}
	&:focus {
		border-color: ${(props) => props.theme.pointColor};
	}
`;

export default AuthInput;
