import { useReactiveVar } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { darkModeVar, logUserOut, toggleDarkMode } from '../apollo';
import { routes } from '../sharedData';

const Container = styled.div`
	max-width: ${(props) => props.theme.maxWidth};
	padding: 10px;
	width: 100%;
	height: 100vh;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	border: 1px solid ${(props) => props.theme.borderColor};
`;
const Header = styled.div`
	width: 100%;
	padding: 10px 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Content = styled.div`
	overflow: scroll;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
`;
const HeaderTitle = styled.span`
	font-size: 30px;
	font-weight: 600;
`;

interface ILayout {
	children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
	const navigation = useNavigate();
	const navigate = useNavigate();
	const darkMode = useReactiveVar(darkModeVar);
	return (
		<Container>
			<Header>
				<div>
					<HeaderTitle>Nomad Coffee</HeaderTitle>
				</div>
				<div>
					<div>
						<button onClick={() => navigation('..', { replace: true })}>
							Back
						</button>
					</div>

					<div>
						<button onClick={() => toggleDarkMode(darkMode)}>
							{darkMode ? 'Light Mode' : 'Dark Mode'}
						</button>
						<button onClick={() => navigate(routes.add)}>Add</button>
						<button onClick={logUserOut}>Log Out</button>
					</div>
				</div>
			</Header>
			<Content>{children}</Content>
		</Container>
	);
};

export default Layout;
