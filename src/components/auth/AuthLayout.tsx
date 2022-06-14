import styled from 'styled-components';

const Container = styled.div`
	max-width: ${(props) => props.theme.maxWidth};
	width: 100%;
	height: 100vh;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	box-shadow: ${(props) => props.theme.boxShadow};
`;
const Content = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	h1 {
		font-size: 20px;
		font-weight: 600;
	}
	form {
		margin: 20px 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		input {
			width: 80%;
			padding: 10px 10px;
			border: 1px solid black;
		}
	}
`;

interface AuthLayoutProps {
	children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<Container>
			<Content>{children}</Content>
		</Container>
	);
};

export default AuthLayout;
