import { useReactiveVar } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { darkModeVar, logUserOut, toggleDarkMode } from '../apollo';
import { routes } from '../sharedData';

const Container = styled.div`
	max-width: ${(props) => props.theme.maxWidth};
	width: 100%;
	height: 100vh;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	position: relative;
	box-shadow: ${(props) => props.theme.boxShadow};
`;

const Header = styled.div`
	width: 100%;
	padding: 5px 10px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
const Content = styled.div`
	overflow-y: scroll;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
`;
const HeaderTitle = styled.span`
	font-size: 20px;
	font-weight: 600;
`;
const BackBtn = styled.button`
	position: absolute;
	top: 10px;
	left: 10px;
	svg {
		width: 30px;
		height: 30px;
	}
`;
const Footer = styled.div`
	width: 100%;
	padding: 10px 10px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	box-shadow: ${(props) => props.theme.boxShadow};
`;

const FooterBtn = styled.button`
	width: 30px;
	height: 30px;
	svg {
		color: ${(props) => props.theme.fontColor};
	}
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
						<BackBtn onClick={() => navigation('..', { replace: true })}>
							<svg
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M15 19l-7-7 7-7'
								/>
							</svg>
						</BackBtn>
					</div>
					<div>
						<button onClick={() => toggleDarkMode(darkMode)}>
							{darkMode ? 'Light Mode' : 'Dark Mode'}
						</button>
						<button onClick={logUserOut}>Log Out</button>
					</div>
				</div>
			</Header>
			<Content>{children}</Content>
			<Footer>
				<FooterBtn onClick={() => navigation(routes.home)}>
					{/* home */}
					<svg
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
						></path>
					</svg>
				</FooterBtn>
				<FooterBtn onClick={() => navigation(routes.search)}>
					{/* serach */}
					<svg
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						></path>
					</svg>
				</FooterBtn>
				<FooterBtn onClick={() => navigation(routes.user)}>
					{/* user */}
					<svg
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
						></path>
					</svg>
				</FooterBtn>
			</Footer>
		</Container>
	);
};

export default Layout;
