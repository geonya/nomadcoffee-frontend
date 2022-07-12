import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useSeeCafesQuery } from '../generated/graphql';
import { routes } from '../routes';
import CafeBox from '../components/CafeBox';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';
import { useEffect, useState } from 'react';

export default function Home() {
  const navigation = useNavigate();
  const { data, loading, fetchMore } = useSeeCafesQuery({
    variables: { offset: 0 },
  });
  const [fetchLoading, setFetchLoading] = useState(true);
  const [distanceArray, setDistanceArray] = useState<number[]>([]);
  const [closestCafeIndex, setClosestCafeIndex] = useState<null | number>(null);
  const onLoadMore = () => {
    setFetchLoading(true);
    fetchMore({
      variables: {
        offset: data?.seeCafes?.length,
      },
    });
    setFetchLoading(false);
  };
  const cacluateDistance = async (address: string, i: number) => {
    return new Promise(async (resolve) => {
      const ourCoords = {
        latitude: data?.seeCafes![i]?.latitude,
        longitude: data?.seeCafes![i]?.longitude,
      };
      const distance = await getMyLocation().then((position: any) =>
        computeDistance(position.coords, ourCoords)
      );
      resolve(distance);
    });
    async function getMyLocation() {
      // navigator.geolocation 없다면 null을 반환하고 조건식의 결과는 false
      if (navigator.geolocation) {
        //getCurrentPosition(successhandler, errorHandler, option)
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      }
    }
    // 구면 코사인 법칙(Spherical Law of Cosine) 으로 두 위도/경도 지점의 거리를 구함
    // 반환 거리 단위 (km)
    function computeDistance(startCoords: any, destCoords: any) {
      const startLatRads = degreesToRadians(startCoords.latitude);
      const startLongRads = degreesToRadians(startCoords.longitude);
      const destLatRads = degreesToRadians(destCoords.latitude);
      const destLongRads = degreesToRadians(destCoords.longitude);
      const Radius = 6371; //지구의 반경(km)
      const distance =
        Math.acos(
          Math.sin(startLatRads) * Math.sin(destLatRads) +
            Math.cos(startLatRads) *
              Math.cos(destLatRads) *
              Math.cos(startLongRads - destLongRads)
        ) * Radius;
      return distance;
    }
    function degreesToRadians(degrees: any) {
      const radians = (degrees * Math.PI) / 180;
      return radians;
    }
  };
  useEffect(() => {
    (async () => {
      if (!data?.seeCafes) return;
      // 모든 카페 거리값들 배열로 정리
      const distanceArray = (await Promise.all(
        data?.seeCafes?.map((cafe, i) =>
          cacluateDistance(cafe?.address as string, i)
        )
      )) as number[];
      setDistanceArray([...distanceArray]);
      // 가장 가까운 카페 구하기
      const minDistance = Math.min(...(distanceArray as number[]));
      const minDistanceIndex = distanceArray.indexOf(minDistance);
      setClosestCafeIndex(minDistanceIndex);
    })();
  }, [data?.seeCafes]);
  return (
    <Layout needMenu={true}>
      <Container id='container'>
        <Top>
          <TopTitle>
            <TopTitleSpan>
              <TopTitleAccent>Morning</TopTitleAccent> begins <br /> with Coffee
            </TopTitleSpan>
            <TopLocation>
              <svg
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span>{distanceArray.length} cafes near you</span>
            </TopLocation>
          </TopTitle>
          <TopCharacter>
            <TopCharacterImg src='https://nomadcoffeee.s3.ap-northeast-2.amazonaws.com/photos/cafe-character.png' />
          </TopCharacter>
          <Link
            to={`/cafe/${
              closestCafeIndex
                ? data?.seeCafes![closestCafeIndex]?.id
                : data?.seeCafes![0]?.id
            }`}
          >
            <MainCafeBox>
              <MainCafeImg
                src={
                  closestCafeIndex
                    ? data?.seeCafes![closestCafeIndex]?.photos![0]?.url
                    : data?.seeCafes![0]?.photos![0]?.url
                }
              />
              <MainCafeTitleBox>
                <h4>The nearest cafe right now</h4>
                <MainCafeTitle>
                  {closestCafeIndex
                    ? data?.seeCafes![closestCafeIndex]?.name
                    : data?.seeCafes![0]?.name}
                </MainCafeTitle>
                <MainCafeLocation>
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
                  {closestCafeIndex !== null ? (
                    <span>
                      {distanceArray[closestCafeIndex] < 0.009
                        ? 0 + ' m'
                        : distanceArray[closestCafeIndex] < 0.1
                        ? distanceArray[closestCafeIndex]
                            .toString()
                            .substring(4, 6) + ' m'
                        : distanceArray[closestCafeIndex].toFixed(1) + ' km'}
                    </span>
                  ) : (
                    <ClipLoader size={12} />
                  )}
                </MainCafeLocation>
              </MainCafeTitleBox>
            </MainCafeBox>
          </Link>
        </Top>
        <CafesContainer>
          {!loading && data && data.seeCafes && (
            <InfiniteScroll
              dataLength={data.seeCafes.length}
              next={onLoadMore}
              hasMore={fetchLoading}
              scrollThreshold={0.9}
              loader={
                <div
                  style={{
                    width: '100%',
                    display: 'grid',
                    placeContent: 'center',
                  }}
                >
                  <ClipLoader />
                </div>
              }
              scrollableTarget='container'
            >
              {data.seeCafes.map((cafe, i) => (
                <CafeBox {...cafe} key={i} distance={distanceArray[i]} />
              ))}
            </InfiniteScroll>
          )}
        </CafesContainer>
        <AddBtn onClick={() => navigation(routes.add)}>
          <svg
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
              clipRule='evenodd'
            />
          </svg>
        </AddBtn>
      </Container>
    </Layout>
  );
}
const Top = styled.div`
  width: 100%;
  padding: 30px 30px;
  padding-bottom: 60px;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);

  position: relative;
`;
const TopTitle = styled.div`
  width: 60%;
  font-size: 33px;
  font-weight: 600;
`;
const TopTitleSpan = styled.span`
  color: ${(props) => props.theme.fontColor};
`;
const TopTitleAccent = styled.span`
  color: ${(props) => props.theme.pointColor};
`;

const TopLocation = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  opacity: 0.7;
  svg {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  span {
    font-size: 12px;
    color: ${(props) => props.theme.fontColor};
  }
`;
const TopCharacter = styled.div`
  width: 40%;
`;
const TopCharacterImg = styled.img`
  width: 100%;
`;

const MainCafeBox = styled.div`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 80%;
  height: 95px;
  border-radius: 35px;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  align-items: center;
`;
const MainCafeImg = styled.img`
  position: absolute;
  left: -5px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
const MainCafeTitleBox = styled.div`
  padding-left: 135px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  line-height: 1.5;
  h4 {
    font-size: 10px;
    font-weight: 600;
  }
`;
const MainCafeTitle = styled.h1`
  font-size: 15px;
  font-weight: 600;
`;
const MainCafeLocation = styled.span`
  opacity: 0.6;
  display: flex;
  align-items: center;
  font-size: 12px;
  svg {
    margin-right: 6px;
    width: 18px;
    height: 18px;
  }
`;

const CafesContainer = styled.div`
  width: 100%;
  padding-top: 80px;
  overflow-y: auto;
`;

const AddBtn = styled.button`
  cursor: pointer;
  background-color: ${(props) => props.theme.pointColor};
  border-radius: 50%;
  position: absolute;
  right: 10px;
  bottom: 80px;
  width: 50px;
  height: 50px;
  box-shadow: ${(props) => props.theme.boxShadow};
  svg {
    color: white;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
