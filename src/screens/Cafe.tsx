import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../components/Avatar';
import Layout from '../components/Layout';
import { useSeeCafeQuery, useToggleLikeMutation } from '../generated/graphql';
import { useSeeMe } from '../hooks/useSeeMe';

export default function Cafe() {
  const navigate = useNavigate();
  const [modalPhoto, setModalPhoto] = useState('');
  const { id: cafeId } = useParams();
  const { data: myData } = useSeeMe();

  const { data, loading } = useSeeCafeQuery({
    variables: { cafeId: +cafeId! },
    onCompleted: (data) => {
      if (!data.seeCafe) return;
    },
  });
  // kakao map api
  useEffect(() => {
    const container = document.getElementById('map');
    if (!container) return;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 2, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options);
    const geocoder = new kakao.maps.services.Geocoder();
    if (!data?.seeCafe?.address) return;
    geocoder.addressSearch(data?.seeCafe?.address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        new kakao.maps.Marker({
          map,
          position: coords,
        });
        map.setCenter(coords);
      }
    });
  }, [data?.seeCafe?.address]);

  const [toggleLikeMutation] = useToggleLikeMutation({
    update: (cache, result) => {
      cache.modify({
        id: `Cafe:${data?.seeCafe?.id}`,
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

  return (
    <Layout hasHeader={false}>
      <Wrapper>
        <HeaderBtn onClick={() => navigate('..', { replace: true })}>
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
        </HeaderBtn>
        <Map id='map'></Map>
        <CafeContent>
          <CafeInfoBox>
            <CafeTitleBox>
              <CafeTitle>{data?.seeCafe?.name}</CafeTitle>
              <CafeCreatorBox
                onClick={() =>
                  navigate(`/users/${data?.seeCafe?.user?.username}`)
                }
              >
                <Avatar
                  source={data?.seeCafe?.user?.avatarUrl || ''}
                  size={20}
                />
                <CafeCreator>{data?.seeCafe?.user?.username}</CafeCreator>
              </CafeCreatorBox>
            </CafeTitleBox>
            <CafeDescription>{data?.seeCafe?.description}</CafeDescription>
            <CafeAddress>{data?.seeCafe?.address}</CafeAddress>
            <FooterBox>
              <LikeButton onClick={() => toggleLike(data?.seeCafe?.id!)}>
                <svg
                  fill={data?.seeCafe?.isLiked ? 'currentColor' : 'none'}
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
                <span>{data?.seeCafe?.countLikes}</span>
              </LikeButton>
              {myData?.seeMyProfile.id === data?.seeCafe?.user.id && (
                <EditButton
                  onClick={() => navigate(`/cafe/${data?.seeCafe?.id}/edit`)}
                >
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
                      d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                    ></path>
                  </svg>
                </EditButton>
              )}
            </FooterBox>
          </CafeInfoBox>
          {data?.seeCafe?.photos && data?.seeCafe?.photos.length > 0 ? (
            <PhotosReivewRow>
              {data.seeCafe.photos.map((photo, i) => (
                <PhotoReview
                  photo={photo?.url!}
                  key={photo?.url}
                  onClick={() => setModalPhoto(photo?.url!)}
                />
              ))}
            </PhotosReivewRow>
          ) : null}
          <AnimatePresence>
            {modalPhoto !== '' ? (
              <>
                <ModalBackground
                  onClick={() => setModalPhoto('')}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { type: 'tween' } }}
                  exit={{ opacity: 0 }}
                >
                  <ModalPhoto
                    photo={modalPhoto}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      transition: { type: 'tween' },
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                  />
                </ModalBackground>
              </>
            ) : null}
          </AnimatePresence>
        </CafeContent>
      </Wrapper>
    </Layout>
  );
}
const CafeContent = styled.div`
  width: 100%;
  position: absolute;
  top: 260px;
  z-index: 100;
  display: grid;
  grid-gap: 20px;
  padding: 0 20px;
  color: ${(props) => props.theme.white};
`;

const PhotosReivewRow = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 5px;
  grid-auto-rows: 100px;
  grid-template-columns: repeat(3, 1fr);
`;
const PhotoReview = styled.div<{ photo: string }>`
  border-radius: 10px;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
`;
const ModalPhoto = styled(motion.div)<{ photo: string }>`
  width: 360px;
  height: 250px;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
`;

const CafeTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;
const CafeDescription = styled.h4`
  opacity: 0.7;
`;
const CafeAddress = styled.span`
  font-size: 11.5px;
  opacity: 0.4;
`;
const CafeInfoBox = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  line-height: 2;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Map = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 20px;
  h4 {
    width: 80px;
    height: 40px;
    display: block;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
`;
const FooterBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2px 0;
`;
const EditButton = styled.button`
  opacity: 0.7;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  svg {
    width: 20px;
    height: 20px;
    color: ${(props) => props.theme.white};
  }
`;
const LikeButton = styled.button`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 5px;
  svg {
    width: 20px;
    height: 20px;
    color: ${(props) => props.theme.red};
  }
  span {
    opacity: 0.6;
    color: ${(props) => props.theme.white};
  }
`;
const ModalBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-content: center;
`;

const HeaderBtn = styled.button`
  position: absolute;
  padding: 20px;
  top: 10px;
  left: 10px;
  z-index: 2;
  svg {
    width: 30px;
    height: 30px;
  }
`;

const CafeCreatorBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const CafeCreator = styled.span`
  margin-left: 5px;
  font-size: 11px;
`;
const CafeTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
