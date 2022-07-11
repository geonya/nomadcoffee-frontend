import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useSeeCafeQuery, useToggleLikeMutation } from '../generated/graphql';
import { routes } from '../sharedData';
import { useSeeMyProfile } from '../utils';

export default function Cafe() {
  const [modalPhoto, setModalPhoto] = useState('');
  const { id: cafeId } = useParams();

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
        <Map id='map'></Map>
        <CafeContent>
          <CafeInfoBox>
            <CafeTitle>{data?.seeCafe?.name}</CafeTitle>
            <CafeDescription>{data?.seeCafe?.description}</CafeDescription>
            <CafeAddress>{data?.seeCafe?.address}</CafeAddress>
            <LikeBox>
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
              </LikeButton>
              <span>{data?.seeCafe?.countLikes}</span>
            </LikeBox>
          </CafeInfoBox>
          {data?.seeCafe?.photos && data?.seeCafe?.photos.length > 0 ? (
            <PhotosReivewRow>
              {data.seeCafe.photos.map((photo, i) => (
                <PhotoReview
                  photo={photo?.url!}
                  key={i}
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
  color: ${(props) => props.theme.bgColor};
  font-size: 18px;
  font-weight: 600;
`;
const CafeDescription = styled.h4`
  color: ${(props) => props.theme.bgColor};
  opacity: 0.7;
`;
const CafeAddress = styled.span`
  font-size: 11.5px;
  color: ${(props) => props.theme.bgColor};
  opacity: 0.4;
`;
const CafeInfoBox = styled.div`
  width: 100%;
  height: 160px;
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
    color: ${(props) => props.theme.fontColor};
    font-weight: 600;
  }
`;
const LikeBox = styled.div`
  justify-self: flex-end;
  display: flex;
  align-items: center;
  span {
    color: ${(props) => props.theme.bgColor};
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
