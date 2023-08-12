import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COMMON_CSS } from "../../constants/common_css";

const StyledSidebar = styled.aside`
  position: sticky;
  top: 3.6375rem;
  width: 10.25rem;
  height: calc(100vh - 3.6375rem);
  padding: 1.5rem 0 0;
  z-index: 0;

  p {
    font-size: 0.6875rem;
    margin: 0.25rem 0 0.25rem 0.5rem;
  }

  a {
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 0.25rem;
    color: ${COMMON_CSS["font-color-gray"]};
    padding: 0.25rem 0.5rem;
    font-size: 0.8125rem;
    line-height: 2;

    path {
      fill: ${COMMON_CSS["icon-color-lightgray"]};
    }

    &:hover,
    &:hover path {
      fill: ${COMMON_CSS["icon-color-black"]};
    }
  }

  ul {
    display: flex;
    flex-flow: column;
  }

  li {
    &.active {
      background: ${COMMON_CSS["nav-background-color"]};
      font-weight: 700;
      border-right: 3px solid ${COMMON_CSS["main-color"]};

      a {
        color: ${COMMON_CSS["icon-color-black"]};
      }

      path {
        fill: ${COMMON_CSS["icon-color-black"]};
      }
    }
  }
`;

const Sidebar = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []);

  return (
    <StyledSidebar>
      <ul>
        <li>
          <p>PUBLIC</p>
          <ul>
            <li className={currentPage === "/" ? "active" : ""}>
              <Link to="/">
                <svg
                  aria-hidden="true"
                  className="svg-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M9 1C4.64 1 1 4.64 1 9c0 4.36 3.64 8 8 8 4.36 0 8-3.64 8-8 0-4.36-3.64-8-8-8ZM8 15.32a6.46 6.46 0 0 1-4.3-2.74 6.46 6.46 0 0 1-.93-5.01L7 11.68v.8c0 .88.12 1.32 1 1.32v1.52Zm5.72-2c-.2-.66-1-1.32-1.72-1.32h-1v-2c0-.44-.56-1-1-1H6V7h1c.44 0 1-.56 1-1V5h2c.88 0 1.4-.72 1.4-1.6v-.33a6.45 6.45 0 0 1 3.83 4.51 6.45 6.45 0 0 1-1.51 5.73v.01Z"></path>
                </svg>
                Questions
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </StyledSidebar>
  );
};
export default Sidebar;
