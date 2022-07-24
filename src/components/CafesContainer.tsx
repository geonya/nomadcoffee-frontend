import styled from 'styled-components';
import { CafeType } from '../types';
import CafeBox from './CafeBox';

interface CafesContainerProps {
  cafes: CafeType;
  distanceArray?: number[];
}
export default function CafesContainer({
  cafes,
  distanceArray,
}: CafesContainerProps) {
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
