import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useSeeCafesQuery } from '../generated/graphql';
import { routes } from '../sharedData';
import CafeBox from '../components/CafeBox';

export default function Home() {
  const navigation = useNavigate();
  const { data, loading } = useSeeCafesQuery({ variables: { offset: 0 } });
  return (
    <Layout>
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
            <span>22 cafes near you</span>
          </TopLocation>
        </TopTitle>
        <TopCharacter>
          <TopCharacterImg src='https://images.vexels.com/media/users/3/294734/isolated/lists/1023420d295545fd3f51cdfb82dc5b18-self-esteem-coffee-character-cute-icon.png' />
        </TopCharacter>
        <MainCafeBox>
          <MainCafeImg src='https://image.shutterstock.com/image-photo/butter-scone-strawberry-cream-600w-1551568154.jpg' />
          <MainCafeTitleBox>
            <MainCafeTitle></MainCafeTitle>
            <MainCafeLocation></MainCafeLocation>
          </MainCafeTitleBox>
        </MainCafeBox>
      </Top>
      {loading
        ? 'loading...'
        : data?.seeCafes?.map((cafe, i) => <CafeBox {...cafe} key={i} />)}
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
    </Layout>
  );
}
const Top = styled.div`
  width: 100%;
  height: 40%;
  padding: 0 30px;
  padding-bottom: 50px;
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
  color: #ffc426;
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
  width: 160px;
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
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
const MainCafeTitleBox = styled.div``;
const MainCafeTitle = styled.span``;
const MainCafeLocation = styled.span``;

const AddBtn = styled.button`
  background-color: ${(props) => props.theme.pointColor};
  border-radius: 50%;
  position: absolute;
  right: 10px;
  bottom: 60px;
  width: 50px;
  height: 50px;
  box-shadow: ${(props) => props.theme.boxShadow};
  svg {
    color: white;
  }
`;
