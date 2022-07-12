import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { logUserOut } from '../apollo';
import Avatar from '../components/Avatar';
import PointButton from '../components/buttons/PointButton';
import { useSeeUser } from '../hooks/useSeeUser';
import Layout from '../components/Layout';

export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { data } = useSeeUser(username!);
  return (
    <Layout>
      {!data || !data.seeUser || !data.seeUser.user ? (
        <Container>
          <h1>User Not Found</h1>
        </Container>
      ) : (
        <Container>
          <ProfileBox>
            <AvatarBox>
              <Avatar source={data.seeUser.user.avatarUrl || ''} size={60} />
              <h1>{data.seeUser.user?.username}</h1>
            </AvatarBox>
            <CountBox>
              <div>
                <h1>Followers</h1>
                <span>{data.seeUser.user.totalFollowers}</span>
              </div>
              <div>
                <h1>Followings</h1>
                <span>{data.seeUser.user.totalFollowing}</span>
              </div>
              <div>
                <h1>Cafes</h1>
                <span>{data.seeUser.user.countCafes}</span>
              </div>
              <div>
                <h1>Given Likes</h1>
                <span>{data.seeUser.user.givenLikes}</span>
              </div>
            </CountBox>
          </ProfileBox>
          {data.seeUser.isMe && (
            <>
              <PointButton
                onClick={() => navigate('edit')}
                style={{ marginBottom: 10 }}
              >
                Edit Profile
              </PointButton>
              <PointButton onClick={() => logUserOut(navigate)}>
                Log Out
              </PointButton>
            </>
          )}

          <PhotoGrid>
            {data.seeUser.user?.cafes?.map((cafe, i) => (
              <Photo
                url={cafe?.photos ? cafe?.photos[0]?.url : undefined}
                key={i}
                onClick={() => navigate(`/cafe/${cafe?.id}`)}
              />
            ))}
          </PhotoGrid>
        </Container>
      )}
    </Layout>
  );
}

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
  span {
    font-size: 14px;
  }
`;

const PhotoGrid = styled.div`
  margin-top: 30px;
  width: 100%;
  display: grid;
  grid-auto-rows: 100px;
  grid-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
`;
const Photo = styled.div<{ url: string | undefined }>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
`;
