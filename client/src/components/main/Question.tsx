import { styled } from "styled-components";
import { Question } from "../../types/types";
import { questionsState } from "../../atoms/atoms";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { COMMON_CSS } from "../../constants/common_css";
const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  max-width: 79rem;
  .title {
    font-size: 1.6875rem;
  }
  h2 {
    font-weight: 400;
    margin-bottom: 0.5rem;
  }
  .content {
    padding: 1rem 0;
    max-width: 79rem;
    margin: 0 1rem;
  }
  .question_user {
    width: 12.5rem;
    margin: 0.625rem 0.375rem auto auto;
  }
  .time {
    margin: 0.0625rem 0 0.25rem 0;
    font-weight: 300;
    font-size: 0.75rem;
  }
  .question_id {
    font-weight: 400;
    font-size: 0.8125rem;
  }
  .question_box {
    padding: 1rem 0;
    border-bottom: 1px solid rgb(227, 230, 232);
    max-width: 79rem;
  }
  .title_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgb(227, 230, 232);
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

function QuestionList() {
  const { isLoading, isError, data } = useFetch<Question[]>(
    questionsState,
    "http://localhost:3001/question",
  );

  if (isLoading) {
    return (
      <QuestionContainer>
        <div>Loading...</div>
      </QuestionContainer>
    );
  }

  if (isError) {
    return (
      <QuestionContainer>
        <div>Error...!</div>
      </QuestionContainer>
    );
  }
  if (data && data.length > 0) {
    return (
      <QuestionContainer>
        <div key={data[0].id} className="question_box">
          <div className="title_box">
            <div className="title">{data[0].title}</div>
            <Link to="/write" className="ask-button">
              Ask Question
            </Link>
          </div>

          <div className="content">{data[0].content}</div>
          <div className="question_user">
            <div className="time">
              questioned {data[0].createdAt.slice(2, 10)} {data[0].createdAt.slice(11, 16)}
            </div>
            <div className="question_id">{data[0].member_id}</div>
          </div>
        </div>
      </QuestionContainer>
    );
  } else {
    return (
      <QuestionContainer>
        <div>No questions available.</div>
      </QuestionContainer>
    );
  }
}

export default QuestionList;
