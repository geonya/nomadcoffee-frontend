import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
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
  description?: string | null;
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
  description,
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
        <PhotoBox photo={photos[0]?.url as string}>
          <PhotoBoxInfo>
            <Distance>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24px'
                viewBox='0 0 24 24'
                width='24px'
                fill='#000000'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z' />
              </svg>
              {distance ? (
                <span>
                  {distance < 0.009
                    ? 0 + ' m'
                    : distance < 0.1
                    ? distance?.toString().substring(4, 6) + ' m'
                    : distance?.toFixed(1) + ' km'}
                </span>
              ) : (
                <ClipLoader size={12} />
              )}
            </Distance>
            <CafeCreatorBox>
              <Avatar source={user?.avatarUrl || ''} size={20} />
              <CafeCreator>{user?.username}</CafeCreator>
            </CafeCreatorBox>
          </PhotoBoxInfo>
        </PhotoBox>
      </Link>
      <CafeInfoBox>
        <TitleLikeNameBox>
          <Link to={`/cafe/${id}`}>
            <CafeTitle>{name}</CafeTitle>
            <CafeDescription>{description}</CafeDescription>
          </Link>
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

const PhotoBox = styled.div<{ photo: string }>`
  border-radius: 10px;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
  width: 300px;
  height: 200px;
  cursor: pointer;
  position: relative;
  display: flex;
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
  line-height: 1.2;
`;
const CafeCreatorBox = styled.div`
  display: flex;
  align-items: center;
`;
const CafeTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;
const CafeDescription = styled.span`
  font-size: 12px;
  opacity: 0.8;
`;
const CafeCreator = styled.span`
  margin-left: 5px;
  font-size: 11px;
`;
const CategoriesListBox = styled.div`
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
  span {
    opacity: 0.7;
  }
`;
const LikeButton = styled.button`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  svg {
    color: ${(props) => props.theme.red};
  }
`;
const Distance = styled.div`
  display: flex;
  align-items: center;
  span {
    opacity: 0.8;
    font-size: 12px;
  }
  svg {
    opacity: 0.6;
    margin-right: 5px;
    width: 18px;
    height: 18px;
  }
`;

const PhotoBoxInfo = styled.div`
  width: 100%;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  align-self: flex-end;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
`;
