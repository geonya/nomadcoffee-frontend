import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logUserOut } from '../apollo';
import Avatar from '../components/Avatar';
import PointButton from '../components/buttons/PointButton';
import { useSeeMyProfileHook } from '../components/hooks/useUser';
import Layout from '../components/Layout';

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
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

const PhotoGrid = styled.div`
	margin-top: 30px;
	width: 100%;
	display: grid;
	grid-auto-rows: 100px;
	grid-template-columns: repeat(4, 1fr);
`;
const Photo = styled.div<{ url: string | undefined }>`
	background-image: url(${(props) => props.url});
	background-size: cover;
	position: relative;
	cursor: pointer;
`;

export default function Profile() {
	const navigate = useNavigate();
	const { data } = useSeeMyProfileHook();
	return (
		<Layout>
			<Container>
				<ProfileBox>
					<AvatarBox>
						<Avatar source={data?.seeMyProfile.avatarUrl!} size={60} />
						<h1>{data?.seeMyProfile.username}</h1>
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
							<span>{data?.seeMyProfile.countCafes}</span>
						</div>
						<div>
							<h1>Given Likes</h1>
							<span>{data?.seeMyProfile.givenLikes}</span>
						</div>
					</CountBox>
				</ProfileBox>
				<PointButton onClick={() => true}>Edit Profile</PointButton>
				<PointButton onClick={() => logUserOut(navigate)}>Log Out</PointButton>
				<PhotoGrid>
					{data?.seeMyProfile.cafes?.map((cafe, i) => (
						<Photo
							url={cafe?.photos ? cafe?.photos[0]?.url : undefined}
							key={i}
							onClick={() => navigate(`/cafe/${cafe?.id}`)}
						/>
					))}
				</PhotoGrid>
			</Container>
		</Layout>
	);
}
