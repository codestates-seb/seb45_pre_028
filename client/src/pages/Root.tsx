import { Outlet } from "react-router-dom";
import ContentSection from "../components/common/ContentSection";
import styled from "styled-components";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";

const StyledContainer = styled.div`
  display: flex;
  flex-flow: row;
  div {
    flex-flow: column;
  }
  justify-content: center;
  max-width: 79rem;
  width: 100%;
  margin: 0 auto;
`;

const Root = (): JSX.Element => {
  return (
    <>
      <Header />
      <StyledContainer>
        <Sidebar />
        <ContentSection>
          <Outlet />
        </ContentSection>
      </StyledContainer>
      <Footer />
    </>
  );
};

export default Root;
