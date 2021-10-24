import styled from "styled-components";
import type { NextPage } from "next";
import EdgesList from "../components/EdgesList";

const Home: NextPage = () => {
  return (
    <MainContainer>
      <HeaderContainer />
      <EdgesList />
      <FooterContainer />
    </MainContainer>
  );
};

export default Home;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2em 1em;
`;

const FooterContainer = styled.footer`
  width: 100%;
  height: 2em;
  border-top: 1px solid #eaeaea;
  margin-top: 1em;
`;

const HeaderContainer = styled.header`
  width: 100%;
  height: 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid #eaeaea;
`;
