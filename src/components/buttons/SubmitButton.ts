import styled from 'styled-components';

const SubmitButton = styled.input`
	width: 100%;
	margin: 10px 0;
	border: none;
	border-radius: 3px;
	background-color: ${(props) => props.theme.pointColor};
	color: white;
	text-align: center;
	padding: 10px;
	font-weight: 600;
	opacity: 1;
	cursor: pointer;
`;

export default SubmitButton;
