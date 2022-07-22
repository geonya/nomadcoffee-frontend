import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { logUserOut } from '../apollo';
import Avatar from '../components/Avatar';
import PointButton from '../components/buttons/PointButton';
import { useSeeUser } from '../hooks/useSeeUser';
import Layout from '../components/Layout';
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../generated/graphql';
import { useApolloClient } from '@apollo/client';
import { useSeeMe } from '../hooks/useSeeMe';
import CafesPhotoGridContainer from '../components/CafesPhotoGridContainer';

interface ProfileBtn {
  isMe?: boolean | null;
  isFollowing?: boolean | null;
}

export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { data } = useSeeUser(username!);
  const { data: myData } = useSeeMe();
  const apolloClient = useApolloClient();
  const [followUser] = useFollowUserMutation({
    variables: {
      username: username!,
    },
    onCompleted: (data) => {
      if (!data?.followUser?.ok) return;
      const { cache } = apolloClient;
      cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing: () => true,
          totalFollowers: (prev) => prev + 1,
        },
      });
      if (!myData?.seeMyProfile) return;
      cache.modify({
        id: `User:${myData.seeMyProfile.username}`,
        fields: {
          totalFollowings: (prev) => prev + 1,
        },
      });
    },
  });
  const [unFollowUser] = useUnfollowUserMutation({
    variables: {
      username: username!,
    },
    onCompleted: (data) => {
      if (!data?.unfollowUser?.ok) return;
      const { cache } = apolloClient;
      cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing: () => false,
          totalFollowers: (prev) => prev - 1,
        },
      });
      if (!myData?.seeMyProfile) return;
      cache.modify({
        id: `User:${myData.seeMyProfile.username}`,
        fields: {
          totalFollowings: (prev) => prev - 1,
        },
      });
    },
  });

  const ProfileBtn = ({ isMe, isFollowing }: ProfileBtn) => {
    if (data?.seeUser?.user?.isMe)
      return (
        <PointButton
          onClick={() => navigate('edit')}
          style={{ marginBottom: 10 }}
        >
          Edit Profile
        </PointButton>
      );
    if (isFollowing) {
      return <PointButton onClick={() => unFollowUser()}>UnFollow</PointButton>;
    } else {
      return <PointButton onClick={() => followUser()}>Follow</PointButton>;
    }
  };
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
              <h1>{data.seeUser.user.username}</h1>
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
          {ProfileBtn(data.seeUser.user)}
          {data.seeUser.user.isMe && (
            <PointButton onClick={() => logUserOut(navigate)}>
              Log Out
            </PointButton>
          )}
          {data.seeUser.user.cafes && (
            <CafesPhotoGridContainer cafes={data.seeUser.user.cafes} />
          )}
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
