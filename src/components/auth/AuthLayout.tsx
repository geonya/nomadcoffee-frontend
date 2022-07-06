import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
const Content = styled.div`
  width: ${(props) => props.theme.maxWidth};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default AuthLayout;
