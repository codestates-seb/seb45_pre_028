import { Link } from "react-router-dom";
import styled from "styled-components";
import { COMMON_CSS } from "../../constants/common_css";
import { getAccessToken } from "../../util/auth";

const StyledListTitle = styled.section`
  padding: 1rem 1rem 1.5rem;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 1.6875rem;
  }

  .ask-button {
    font-size: 0.8125rem;
    background: ${COMMON_CSS["button-color"]};
    color: #fff;
    padding: 0.8rem;
    border-radius: 6px;

    &:hover {
      background: ${COMMON_CSS["button-hover-color"]};
    }
  }
`;

const QuestionListTitle = () => {
  const token = getAccessToken();

  return (
    <StyledListTitle>
      <h1> All Questions</h1>
      {token && (
        <Link to="/write" className="ask-button">
          Ask Question
        </Link>
      )}
    </StyledListTitle>
  );
};

export default QuestionListTitle;
