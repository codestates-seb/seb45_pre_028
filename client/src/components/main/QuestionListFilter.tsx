import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { questionsState } from "../../atoms/atoms";

const StyledListFilter = styled.section`
  padding: 0 1rem;
`;

const QuestionListFilter = () => {
  const data = useRecoilValue(questionsState);

  return (
    <StyledListFilter>
      <span>{data.length} questions with bounties</span>
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
