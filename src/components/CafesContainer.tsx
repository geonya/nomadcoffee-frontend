import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { CafeType } from '../types';
import CafeBox from './CafeBox';
import Loading from './Loading';

interface CafesContainerProps {
  cafes: CafeType;
  loading: boolean;
  fetchMore: ({ variables }: any) => void;
  distanceArray?: number[];
}
export default function CafesContainer({
  cafes,
  loading,
  fetchMore,
  distanceArray,
}: CafesContainerProps) {
  // const [fetchLoading, setFetchLoading] = useState(true);
  // const onLoadMore = () => {
  //   setFetchLoading(true);
  //   fetchMore({
  //     variables: {
  //       offset: cafes?.length,
  //     },
  //   });
  //   setFetchLoading(false);
  // };
  return (
    <Container>
      {cafes.map((cafe, i) => (
        <CafeBox
          {...cafe}
          key={i}
          distance={distanceArray && distanceArray[i]}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding-top: 80px;
  overflow-y: auto;
`;
