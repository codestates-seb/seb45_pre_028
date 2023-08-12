import { styled } from "styled-components";
import { Answer } from "../../types/types";
import { AnswerState, readAnswerData } from "../../atoms/atoms";
import { useFetch } from "../../hooks/useFetch";
const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  border-bottom: 1px solid rgb(227, 230, 232);
  max-width: 79rem;
  margin: 0 1rem;
  h2 {
    font-weight: 400;
    margin-bottom: 0.5rem;
  }
  .answer_user {
    margin-top: 0.625rem;
    float: right;
  }
  .time {
    margin: 0.0625rem 0 0.25rem 0;
    font-weight: 300;
    font-size: 0.75rem;
  }
  .answer_id {
    font-weight: 400;
    font-size: 0.8125rem;
  }
`;

function AnswerList() {
  const { isLoading, isError, data } = useFetch<Answer[]>(AnswerState, readAnswerData);

  if (isLoading) {
    return (
      <AnswerContainer>
        <div>Loading...</div>
      </AnswerContainer>
    );
  }

  if (isError) {
    return (
      <AnswerContainer>
        <div>Error...!</div>
      </AnswerContainer>
    );
  }
  return (
    <AnswerContainer>
      <div>
        {data && <h2>{data.length} Answer</h2>}
        {data &&
          data.map((x: Answer) => (
            <div key={x.answer_id}>
              <div>{x.content}</div>
              <div className="answer_user">
                <div className="time">answered {x.createdAt.slice(2, -3)}</div>
                <div className="answer_id">{x.member_id}</div>
              </div>
            </div>
          ))}
      </div>
    </AnswerContainer>
  );
}

export default AnswerList;
