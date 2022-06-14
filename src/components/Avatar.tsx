import styled from 'styled-components';

const AvatarImage = styled.img<{ src: string; size: number }>`
	width: ${(props) => props.size}px;
	height: ${(props) => props.size}px;
	border-radius: 50px;
`;
const AvatarCircle = styled.div<{ size: number }>`
	background-color: ${(props) => props.theme.pointColor};
	width: ${(props) => props.size}px;
	height: ${(props) => props.size}px;
	border-radius: 50px;
`;

interface AvatarProps {
	source?: string;
	size: number;
}

export default function Avatar({ source, size }: AvatarProps) {
	return source ? (
		<AvatarImage src={source} size={size} />
	) : (
		<AvatarCircle size={size} />
	);
}
