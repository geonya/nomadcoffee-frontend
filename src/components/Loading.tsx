import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

export default function Loading() {
  return (
    <LoadingContainer>
      <ClipLoader />
    </LoadingContainer>
  );
}
const LoadingContainer = styled.div`
  right: 0;
  left: 0;
  margin: 0 auto;
`;
