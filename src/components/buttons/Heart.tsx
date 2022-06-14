import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../sharedData';

const Button = styled.button`
	width: 25px;
	height: 25px;
	margin-right: 10px;
	svg {
		color: red;
	}
`;
export default function Heart() {
	const navigate = useNavigate();
	return (
		<Button onClick={() => navigate(routes.notification)}>
			<svg
				fill='currentColor'
				stroke='currentColor'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
					d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
				></path>
			</svg>
		</Button>
	);
}
