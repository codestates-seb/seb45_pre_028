import { Outlet } from "react-router-dom";
import styled from "styled-components";
import ContentSection from "../components/common/ContentSection";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

const StyledContainer = styled.div`
  display: flex;
  flex-flow: row;
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
    </>
  );
};

export default Root;
