import styled from 'styled-components';

interface AvatarProps {
  source?: string;
  size: number;
}

export default function Avatar({ source, size }: AvatarProps) {
  return source ? (
    <AvatarImage src={source} size={size} />
  ) : (
    <AvatarCircle size={size}>
      <span>☕️</span>
    </AvatarCircle>
  );
}

const AvatarImage = styled.img<{ src: string; size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50px;
`;
const AvatarCircle = styled.div<{ size: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border-radius: 50px;
  display: grid;
  place-content: center;
  span {
    font-size: ${(props) => `${props.size || 20}px`};
  }
`;
