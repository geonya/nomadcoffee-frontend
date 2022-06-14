import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { logUserOut } from '../apollo';
import Avatar from '../components/Avatar';
import PointButton from '../components/buttons/PointButton';
import Layout from '../components/Layout';

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const ProfileBox = styled.div`
	width: 100%;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const CountBox = styled.div`
	width: 80%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	grid-gap: 10px;
	div {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		h1 {
			font-weight: 600;
			margin-bottom: 3px;
		}
	}
`;

const AvatarBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 20%;
	h1 {
		font-size: 15px;
		font-weight: 600;
	}
`;

interface IState {
	seeMyProfile: {
		username: string;
		email: string;
		avatarUrl: string;
		countCafes: number;
		givenLikes: number;
	};
}

export default function Profile() {
	const location = useLocation();
	const {
		seeMyProfile: { username, email, avatarUrl, countCafes, givenLikes },
	} = location.state as IState;
	return (
		<Layout>
			<Container>
				<ProfileBox>
					<AvatarBox>
						<Avatar source={avatarUrl} size={60} />
						<h1>{username}</h1>
					</AvatarBox>
					<CountBox>
						<div>
							<h1>Total Followers</h1>
							<span>12314</span>
						</div>
						<div>
							<h1>Total Followings</h1>
							<span>12314</span>
						</div>
						<div>
							<h1>Total Cafes</h1>
							<span>{countCafes}</span>
						</div>
						<div>
							<h1>Given Likes</h1>
							<span>{givenLikes}</span>
						</div>
					</CountBox>
				</ProfileBox>
				<PointButton onClick={() => logUserOut()}>Log Out</PointButton>
			</Container>
		</Layout>
	);
}
