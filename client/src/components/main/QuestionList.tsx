import { Link } from "react-router-dom";
import styled from "styled-components";
import { questionsState, readData } from "../../atoms/atoms";
import { COMMON_CSS } from "../../constants/common_css";
import { useFetch } from "../../hooks/useFetch";
import { Question } from "../../types/types";

const StyledQuestionList = styled.section`
  color: ${COMMON_CSS["font-color-black"]};

  li {
    padding: 1rem;

    &:not(:last-child) {
      border-bottom: 1px solid ${COMMON_CSS["border-color"]};
    }
  }

  .count {
    color: ${COMMON_CSS["font-color-gray"]};
    margin: 0 0 0.25rem;
    font-size: 0.8125rem;
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 0.375rem;
  }

  h3 {
    color: ${COMMON_CSS["button-hover-color"]};
    font-size: 1.0625rem;
    margin: 0 0 0.3846rem;

    &:hover {
      color: ${COMMON_CSS["button-color"]};
    }
  }

  .summary {
    margin: 0 0 0.5rem;
  }

  .user {
    color: ${COMMON_CSS["font-color-gray"]};
    font-size: 0.75rem;
    display: flex;
    flex-flow: row;
    gap: 0.25rem;
    align-items: center;
    justify-content: flex-end;

    .id {
      color: ${COMMON_CSS["button-hover-color"]};
    }
  }
`;

const QuestionList = () => {
  const { isLoading, isError, data } = useFetch<Question[]>(questionsState, readData);

  return (
    <StyledQuestionList>
      {isLoading && <div>Loading...</div>}
      {isError && <div>문제가 발생했습니다.</div>}
      {!isLoading && (
        <ul>
          {data.map((question) => (
            <li key={question.question_id}>
              <div className="count">
                <span className="answers-count">0 answers</span>
                <span className="views">0 views</span>
              </div>
              <h3>
                <Link to="/" className="question-title">
                  {question.title}
                </Link>
              </h3>
              <p className="summary">{question.content}</p>
              <div className="user">
                <span className="id">{question.member_id}</span>
                <span className="activity">{question.modifiedAt ? "modefied" : "asked"}</span>
                <span className="timestamp">{question.createdAt}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </StyledQuestionList>
  );
};

export default QuestionList;
