import { useState } from "react";
import styled from "styled-components";
import BottomProfile from "../components/user/BottomProfile";
import Setting from "../components/user/Setting";
import TopProfile from "../components/user/TopProfile";
import { COMMON_CSS } from "../constants/common_css";

export interface Tab {
  title: string;
  component: JSX.Element;
}

export interface ProfileProp {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const StyledPage = styled.section`
  padding: 1.5rem;

  .tab-button {
    margin: 0 0 1rem;
    display: flex;
    gap: 0.25rem;

    button {
      padding: 0.375rem 0.75rem;
      border: none;
      background: transparent;
      color: ${COMMON_CSS["font-color-gray"]};
      border-radius: 20px;

      &:hover {
        background: #e3e6e8;
      }

      &.active {
        background: ${COMMON_CSS["main-color"]};
        color: #fff;
      }
    }
  }
`;

const Profile = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tab: Tab[] = [
    { title: "Profile", component: <BottomProfile /> },
    { title: "Setting", component: <Setting setActiveTab={setActiveTab} /> },
  ];

  const onClickHandler = (index: number) => {
    setActiveTab(index);
  };

  return (
    <StyledPage>
      <TopProfile setActiveTab={setActiveTab} />
      <div className="tab-button">
        {tab.map((el, index) => {
          return (
            <button
              key={el.title}
              className={index === activeTab ? "active" : ""}
              onClick={() => onClickHandler(index)}
            >
              {el.title}
            </button>
          );
        })}
      </div>
      <div>{tab[activeTab].component}</div>
    </StyledPage>
  );
};

export default Profile;
