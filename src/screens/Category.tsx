import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CafesPhotoGridContainer from '../components/CafesPhotoGridContainer';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { useSeeCategoryQuery } from '../generated/graphql';
import { CafeType } from '../types';

const Category = () => {
  const { slug } = useParams();
  const [cafes, setCafes] = useState<CafeType | undefined | null>(null);
  const { data } = useSeeCategoryQuery({
    variables: {
      slug: slug!,
    },
  });

  useEffect(() => {
    if (data) setCafes(data.seeCategory);
  }, [data]);

  return (
    <Layout>
      <Wrapper>
        <Title>#{slug}</Title>
        {cafes ? (
          <CafesPhotoGridContainer cafes={cafes} />
        ) : (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        )}
      </Wrapper>
    </Layout>
  );
};

export default Category;
const Wrapper = styled.div`
  padding: 0 10px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: grid;
  place-content: center;
`;
