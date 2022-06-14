import styled from 'styled-components';

const Message = styled.span`
	font-size: 11px;
	color: tomato;
	font-weight: 600;
`;
interface FormErrorProps {
	message?: string;
}
export default function FormError({ message }: FormErrorProps) {
	return <Message>{message}</Message>;
}
