import styled from "styled-components";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import WriteForm from "../components/write/WriteForm";
import WritePageTitle from "../components/write/WritePageTitle";

const StyledLayout = styled.main`
  max-width: 79rem;
  margin: 0 auto;
  padding: 0 1.5rem 1.5rem;

  display: flex;
  align-items: flex-start;
  flex-flow: column;
  gap: 1rem;

  .box {
    width: 100%;
    padding: 1.5rem;
    border: 1px solid #d6d9dc;
    border-radius: 6px;
  }
`;

const Write = () => {
  return (
    <>
      <Header />
      <StyledLayout>
        <WritePageTitle />
        <WriteForm />
      </StyledLayout>
      <Footer />
    </>
  );
};

export default Write;
