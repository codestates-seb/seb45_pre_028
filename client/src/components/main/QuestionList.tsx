import styled from "styled-components";
import { questionsState, readData } from "../../atoms/atoms";
import { useFetch } from "../../hooks/useFetch";
import { Question } from "../../types/types";
const StyledQuestionList = styled.section``;

const QuestionList = () => {
  const { isLoading, isError, data } = useFetch<Question[]>(questionsState, readData);

  return (
    <StyledQuestionList>
      {isLoading && <div>Loading...</div>}
      {isError && <div>문제가 발생했습니다.</div>}
      {!isLoading && (
        <ul>
          {data.map((question) => (
            <li key={question.question_id}>{question.title}</li>
          ))}
        </ul>
      )}
    </StyledQuestionList>
  );
};

export default QuestionList;
