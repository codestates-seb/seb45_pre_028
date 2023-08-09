import { Outlet } from "react-router-dom";
import ContentSection from "../components/common/ContentSection";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

const Root = (): JSX.Element => {
  return (
    <>
      <Header />
      <div>
        <Sidebar />
        <ContentSection>
          <Outlet />
        </ContentSection>
      </div>
    </>
  );
};

export default Root;
