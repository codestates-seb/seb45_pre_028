import styled from "styled-components";
import { COMMON_CSS } from "../../constants/common_css";

const StyledTitle = styled.div`
  width: 100%;

  .title {
    height: 8.125rem;
    display: flex;
    align-items: center;

    h1 {
      font-weight: 600;
      margin: 1.5rem 0;
      font-size: 1.6875rem;
    }
  }

  .box.notice {
    border: 1px solid #a6ceed;
    background: #ebf4fb;
    color: ${COMMON_CSS["font-color-black"]};

    h2 {
      font-size: 1.3125rem;
      margin: 0 0 0.5rem;
    }

    p {
      font-size: 15px;

      &:last-of-type {
        margin: 0 0 0.9375rem;
      }
    }

    h5 {
      font-size: 0.8125rem;
      font-weight: 600;
      margin: 0 0 0.5rem;
    }

    ul {
      list-style: disc;
      margin: 0 0 0 1.875rem;
      font-size: 0.8125rem;
    }
  }
`;

const WritePageTitle = () => {
  return (
    <StyledTitle>
      <div className="title">
        <h1>Ask a public question</h1>
      </div>
      <div className="notice box">
        <h2>Writing a good question</h2>
        <p>
          You’re ready to ask a programming-related question and this form will help guide you
          through the process.
        </p>
        <p>
          Looking to ask a non-programming question? See the topics here to find a relevant site.
        </p>
        <h5>Steps</h5>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Add “tags” which help surface your question to members of the community.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
    </StyledTitle>
  );
};

export default WritePageTitle;
