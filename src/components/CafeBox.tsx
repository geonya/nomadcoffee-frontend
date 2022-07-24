import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import { useSeeCafeQuery, useToggleLikeMutation } from '../generated/graphql';
import Avatar from './Avatar';
import Loading from './Loading';

interface CafeBoxProps {
  __typename?: 'Cafe';
  id?: number;
  name?: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  description?: string | null;
  countLikes?: number;
  isLiked?: boolean;
  photos?: Array<{ __typename?: 'CafePhoto'; url: string } | null> | null;
  categories?: Array<{
    __typename?: 'Category';
    name?: string;
    slug?: string;
  } | null> | null;
  user?: { __typename?: 'User'; username: string; avatarUrl?: string | null };
  distance?: number;
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
  const navigate = useNavigate();
  const { data, loading } = useSeeCafeQuery({ variables: { cafeId: id! } });
  const [toggleLikeMutation, { loading: likeLoading }] = useToggleLikeMutation({
    update: (cache, result) => {
      cache.modify({
        id: `Cafe:${id}`,
        fields: {
          isLiked: (prev) => !prev,
          countLikes: (prev) => (data?.seeCafe?.isLiked ? prev - 1 : prev + 1),
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
      <PhotoBox>
        <Link to={`/cafe/${id}`}>
          <Photo photo={photos[0]?.url as string} />
        </Link>
        <PhotoBoxInfo>
          <Distance>
            {distance ? (
              <>
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

                <span>
                  {distance < 0.009
                    ? 0 + ' m'
                    : distance < 0.1
                    ? distance?.toString()?.substring(4, 6) + ' m'
                    : distance?.toFixed(1) + ' km'}
                </span>
              </>
            ) : (
              <ClipLoader size={12} />
            )}
          </Distance>
          <CafeCreatorBox onClick={() => navigate(`/users/${user?.username}`)}>
            <Avatar source={user?.avatarUrl || ''} size={20} />
            <CafeCreator>{user?.username}</CafeCreator>
          </CafeCreatorBox>
        </PhotoBoxInfo>
      </PhotoBox>

      <CafeInfoBox>
        <TitleLikeNameBox>
          <Link to={`/cafe/${id}`}>
            <CafeTitle>{name}</CafeTitle>
            <CafeDescription>{description}</CafeDescription>
          </Link>
          <LikeBox>
            <LikeButton onClick={() => toggleLike(id!)}>
              <svg
                fill={
                  data?.seeCafe?.isLiked || isLiked ? 'currentColor' : 'none'
                }
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
            <span>{data?.seeCafe?.countLikes || countLikes}</span>
          </LikeBox>
        </TitleLikeNameBox>
        <CategoriesListBox>
          <CategoryBox>
            {categories?.map((category, i) => (
              <a href={`/category/${category?.slug}`} key={i}>
                {category?.name}
              </a>
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

const PhotoBox = styled.div`
  width: 300px;
  height: 200px;
  position: relative;
  display: flex;
`;
const Photo = styled.div<{ photo: string }>`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
  z-index: 0;
`;

const PhotoBoxInfo = styled.div`
  z-index: 10;
  width: 100%;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  align-self: flex-end;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  color: #2c2c2c;
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
  margin-bottom: 5px;
`;
const CafeCreatorBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px;
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
  a {
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
  color: #2c2c2c;
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
