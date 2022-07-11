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
          <TopCharacterImg src='https://nomadcoffeee.s3.ap-northeast-2.amazonaws.com/photos/cafe-character.png' />
        </TopCharacter>
        <MainCafeBox>
          <MainCafeImg src='https://nomadcoffeee.s3.ap-northeast-2.amazonaws.com/photos/maincafe-img.jpeg' />
          <MainCafeTitleBox>
            <MainCafeTitle>Grain Square Cafe</MainCafeTitle>
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
              </svg>{' '}
              500 m
            </MainCafeLocation>
          </MainCafeTitleBox>
        </MainCafeBox>
      </Top>
      <CafesContainer>
        {loading
          ? 'loading...'
          : data?.seeCafes?.map((cafe, i) => <CafeBox {...cafe} key={i} />)}
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
    </Layout>
  );
}
const Top = styled.div`
  width: 100%;
  padding: 50px 30px;
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
  padding-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  line-height: 1.5;
`;
const MainCafeTitle = styled.span`
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
