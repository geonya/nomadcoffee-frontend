import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	padding: 50px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const Wrapper = styled.div`
	max-width: 350px;
	width: 100%;
	form {
		flex-direction: column;
		input {
			border: 1px solid black;
			padding: 10px;
			width: 100%;
		}
	}
`;

interface ILayout {
	children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
	const navigation = useNavigate();
	return (
		<Container>
			<Wrapper>
				<div
					style={{
						width: '100%',
						marginBottom: 30,
						position: 'relative',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<button
						onClick={() => navigation('..', { replace: true })}
						style={{ position: 'absolute', left: 0 }}
					>
						Back
					</button>
					<span style={{ fontSize: '20px' }}>Nomad Coffee</span>
				</div>
				{children}
			</Wrapper>
		</Container>
	);
};

export default Layout;
