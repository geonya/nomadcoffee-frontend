import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useToggleLikeMutation } from '../generated/graphql';
import Avatar from './Avatar';

interface CafeBoxProps {
  id?: number;
  name?: string;
  address?: string | null | undefined;
  countLikes?: number;
  isLiked?: boolean;
  categories?: Array<{ __typename?: 'Category'; name: string } | null> | null;
  photos?:
    | ({
        __typename?: 'CafePhoto' | undefined;
        url: string;
      } | null)[]
    | null;
  user?: {
    username: string;
    avatarUrl?: string | null;
  };
  distance: number;
}
export default function CafeBox({
  id,
  name,
  user,
  photos,
  countLikes,
  isLiked,
  categories,
  distance,
}: CafeBoxProps) {
  const [toggleLikeMutation, { loading }] = useToggleLikeMutation({
    update: (cache, result) => {
      cache.modify({
        id: `Cafe:${id}`,
        fields: {
          isLiked: (prev) => !prev,
          countLikes: (prev) => (isLiked ? prev - 1 : prev + 1),
        },
      });
    },
  });
  const toggleLike = (id: number) => {
    if (loading) return;
    toggleLikeMutation({
      variables: {
        cafeId: id,
      },
    });
  };

  return photos ? (
    <Container>
      <Link to={`/cafe/${id}`}>
        <CafeImg src={photos[0]?.url} alt={name} />
      </Link>
      <CafeInfoBox>
        <TitleLikeNameBox>
          <CafeCreatorBox>
            <Avatar source={user?.avatarUrl || ''} size={20} />
            <CafeCreator>{user?.username}</CafeCreator>
          </CafeCreatorBox>
          <Link to={`/cafe/${id}`}>
            <CafeTitle>{name}</CafeTitle>
          </Link>
          {distance ? (
            <span>
              {distance < 0.009
                ? 0 + ' m'
                : distance < 0.1
                ? distance?.toString().substring(4, 6) + ' m'
                : distance?.toFixed(2) + ' km'}
            </span>
          ) : null}
          <LikeBox>
            <LikeButton onClick={() => toggleLike(id!)}>
              <svg
                fill={isLiked ? 'currentColor' : 'none'}
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
            </LikeButton>
            <span>{countLikes}</span>
          </LikeBox>
        </TitleLikeNameBox>
        <CategoriesListBox>
          <CategoryBox>
            {categories?.map((category, i) => (
              <span key={i}>{category?.name}</span>
            ))}
          </CategoryBox>
        </CategoriesListBox>
      </CafeInfoBox>
    </Container>
  ) : null;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
`;

const CafeImg = styled.img`
  border-radius: 10px;
  width: 300px;
  height: 200px;
`;
const CafeInfoBox = styled.div`
  width: 100%;
  padding: 10px 35px;
  display: flex;
  flex-direction: column;
`;
const TitleLikeNameBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CafeCreatorBox = styled.div`
  display: flex;
  align-items: center;
`;
const CafeTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;
const CafeCreator = styled.span`
  margin-left: 5px;
`;
const CategoriesListBox = styled.div`
  margin-top: 10px;
  width: 100%;
`;

const CategoryBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  span {
    cursor: pointer;
    margin-right: 5px;
    font-size: 10px;
    padding: 3px;
    background-color: ${(props) => props.theme.pointColor};
    color: white;
    border-radius: 5px;
  }
`;
const LikeBox = styled.div`
  display: flex;
  align-items: center;
`;
const LikeButton = styled.button`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  svg {
    color: ${(props) => props.theme.red};
  }
`;
