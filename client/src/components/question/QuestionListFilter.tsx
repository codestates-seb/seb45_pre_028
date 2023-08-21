import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { questionsState } from "../../atoms/atoms";
import { COMMON_CSS } from "../../constants/common_css";

const StyledListFilter = styled.section`
  padding: 0 1rem 0.75rem;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${COMMON_CSS["border-color"]};

  span {
    font-size: 1.0625rem;
  }

  ul {
    display: flex;
    flex-flow: row;
    border: solid 0.5px #babfc4;
    border-radius: 0.375rem;

    li:not(:last-child) {
      border-right: solid 0.5px #babfc4;
    }
  }

  button {
    padding: 0.6rem;
    border: none;
    background: transparent;
    color: ${COMMON_CSS["font-color-black"]};
    font-size: 0.75rem;
  }
`;

const QuestionListFilter = () => {
  const data = useRecoilValue(questionsState);

  return (
    <StyledListFilter>
      <span>{data.questionData.length.toLocaleString()} questions with bounties</span>
      <ul>
        <li>
          <button>Newest</button>
        </li>
        <li>
          <button>Most viewed</button>
        </li>
        <li>
          <button>Recently answered</button>
        </li>
      </ul>
    </StyledListFilter>
  );
};

export default QuestionListFilter;
