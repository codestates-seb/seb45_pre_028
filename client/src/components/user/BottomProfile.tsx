import styled from "styled-components";
import { memberState } from "../../atoms/atoms";
import { COMMON_CSS } from "../../constants/common_css";
import { useFetch } from "../../hooks/useFetch";
import { getAccessToken } from "../../util/auth";

const StyledProfile = styled.section`
  display: flex;
  gap: 1.5rem;

  .status {
    flex-basis: calc(25% - 1.5rem);

    h3 {
      font-size: 1.3125rem;
      margin: 0 0 0.5rem;
    }

    .stat-box {
      width: 100%;
      padding: 0.75rem;
      display: flex;
      border-radius: 6px;
      border: 1px solid ${COMMON_CSS["border-color"]};

      li {
        width: 50%;
        display: flex;
        flex-flow: column;
        margin: 0.5rem;
      }

      .count {
        font-size: 1.0625rem;
        color: ${COMMON_CSS["font-color-black"]};
      }

      .stat-name {
        font-size: 0.8125rem;
        color: ${COMMON_CSS["font-color-gray"]};
      }
    }
  }
`;

const BottomProfile = (): JSX.Element => {
  const memberId = 1;
  const token = getAccessToken();
  const { data } = useFetch(memberState, `/member/${memberId}`, token);

  return (
    <StyledProfile>
      <div className="status">
        <h3>Stats</h3>
        <ul className="stat-box">
          <li>
            <p className="count">{data.questionCount}</p>
            <p className="stat-name">Questions</p>
          </li>
          <li>
            <p className="count">{data.answerCount}</p>
            <p className="stat-name">Answer</p>
          </li>
        </ul>
      </div>
      <div className="status">
        <h3>About</h3>
        <p>{data.about}</p>
      </div>
    </StyledProfile>
  );
};

export default BottomProfile;
