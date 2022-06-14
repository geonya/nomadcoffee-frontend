import { useReactiveVar } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { darkModeVar, toggleDarkMode } from '../apollo';
import { routes } from '../sharedData';
import { useSeeMyProfileHook } from './hooks/useUser';

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
	padding: 10px 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: ${(props) => props.theme.boxShadow};
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

const BackBtn = styled.button`
	position: absolute;
	top: 8px;
	left: 5px;
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

const IconBtn = styled.button`
	width: 25px;
	height: 25px;
	svg {
		color: ${(props) => props.theme.fontColor};
	}
`;
const HeaderTitle = styled.span`
	font-size: 20px;
	font-weight: 600;
`;
const HeaderBtnContainer = styled.div`
	display: flex;
`;
const HeartBtn = styled(IconBtn)`
	margin-right: 10px;
	svg {
		color: ${(props) => props.theme.red};
	}
`;
const DarkModeBtnContainer = styled.div`
	position: relative;
	width: 42px;
	height: 26px;
`;
const DarkModeBtnLabel = styled.label`
	position: absolute;
	width: 42px;
	height: 26px;
	border-radius: 15px;
	background: ${(props) => props.theme.fontColor};
	cursor: pointer;
	&::after {
		content: '';
		display: block;
		border-radius: 50%;
		width: 18px;
		height: 18px;
		margin: 3.5px;
		background: ${(props) => props.theme.bgColor};
		transition: 0.2s;
	}
`;
const DarkModeBtn = styled.input`
	opacity: 0;
	z-index: 1;
	border-radius: 50%;
	width: 42px;
	height: 26px;
	&:checked + ${DarkModeBtnLabel} {
		background: ${(props) => props.theme.fontColor};
		&::after {
			content: '';
			display: block;
			border-radius: 50%;
			width: 18px;
			height: 18px;
			margin-left: 21px;
			transition: 0.2s;
		}
	}
`;
interface ILayout {
	children: React.ReactNode;
	hasHeader?: boolean;
	hasFooter?: boolean;
}
const Layout = ({ children, hasHeader = true, hasFooter = true }: ILayout) => {
	const navigate = useNavigate();
	const darkMode = useReactiveVar(darkModeVar);
	const { data } = useSeeMyProfileHook();
	return (
		<Container>
			{hasHeader && (
				<Header>
					<BackBtn onClick={() => navigate('..', { replace: true })}>
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
					<HeaderTitle>Nomad Coffee</HeaderTitle>
					<HeaderBtnContainer>
						<HeartBtn onClick={() => navigate(routes.notification)}>
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
						</HeartBtn>
						<DarkModeBtnContainer>
							<DarkModeBtn
								id='checkbox'
								type='checkbox'
								onChange={() => toggleDarkMode(darkMode)}
							/>
							<DarkModeBtnLabel htmlFor='checkbox' />
						</DarkModeBtnContainer>
					</HeaderBtnContainer>
				</Header>
			)}
			<Content>{children}</Content>
			{hasFooter && (
				<Footer>
					<IconBtn onClick={() => navigate(routes.home)}>
						{/* home */}
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
								d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
							></path>
						</svg>
					</IconBtn>
					<IconBtn onClick={() => navigate(routes.search)}>
						{/* serach */}
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
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
							></path>
						</svg>
					</IconBtn>
					<IconBtn
						onClick={() => navigate(`/users/${data?.seeMyProfile.username}`)}
					>
						{/* user */}
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
								d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
							></path>
						</svg>
					</IconBtn>
				</Footer>
			)}
		</Container>
	);
};

export default Layout;
