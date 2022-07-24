import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

export default function Loading() {
  return (
    <LoadingContainer>
      <ClipLoader />
      <span style={{ marginTop: 20 }}>Loading...</span>
    </LoadingContainer>
  );
}
const LoadingContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
