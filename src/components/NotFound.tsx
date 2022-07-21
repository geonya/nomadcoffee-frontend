import styled from 'styled-components';
import Layout from './Layout';

export default function NotFound() {
  return (
    <Layout>
      <Container>
        <h3>Not Found</h3>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-content: center;
  h3 {
    font-size: 20px;
    font-weight: 600;
  }
`;
