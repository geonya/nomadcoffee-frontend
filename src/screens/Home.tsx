import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useSeeCafesQuery } from '../generated/graphql';
import { routes } from '../sharedData';
import CafeBox from '../components/CafeBox';

const AddBtn = styled.button`
	background-color: ${(props) => props.theme.pointColor};
	border-radius: 50%;
	position: absolute;
	right: 10px;
	bottom: 60px;
	width: 50px;
	height: 50px;
	box-shadow: ${(props) => props.theme.boxShadow};
	svg {
		color: white;
	}
`;
export default function Home() {
	const navigation = useNavigate();
	const { data, loading } = useSeeCafesQuery({ variables: { offset: 0 } });
	return (
		<Layout>
			{loading
				? 'loading...'
				: data?.seeCafes?.map((cafe, i) => <CafeBox {...cafe} key={i} />)}
			<AddBtn onClick={() => navigation(routes.add)}>
				<svg
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fillRule='evenodd'
						d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
						clipRule='evenodd'
					/>
				</svg>
			</AddBtn>
		</Layout>
	);
}
