import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CafeType } from '../types';

interface CafesPhotoGridContainerProps {
  cafes: CafeType;
}
export default function CafesPhotoGridContainer({
  cafes,
}: CafesPhotoGridContainerProps) {
  const navigate = useNavigate();
  return cafes ? (
    <PhotoGrid>
      {cafes?.map((cafe, i) => (
        <Photo
          url={cafe?.photos ? cafe?.photos[0]?.url : undefined}
          key={i}
          onClick={() => navigate(`/cafe/${cafe?.id}`)}
        />
      ))}
    </PhotoGrid>
  ) : null;
}

const PhotoGrid = styled.div`
  margin-top: 30px;
  width: 100%;
  display: grid;
  grid-auto-rows: 100px;
  grid-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
`;
const Photo = styled.div<{ url: string | undefined }>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  position: relative;
  cursor: pointer;
  border-radius: 5px;
`;
