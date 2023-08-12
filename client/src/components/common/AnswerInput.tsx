import React from "react";
import { styled } from "styled-components";
import { COMMON_CSS } from "../../constants/common_css";
const AnswerInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  form {
    max-width: 79rem;
    margin: 0 1rem;
    font-size: 1.2rem;
    label,
    textarea,
    button {
      margin-top: 1.5rem;
    }
    display: flex;
    flex-direction: column;
    textarea {
      width: 100%;
      resize: none;
      height: 10rem;
    }
    button {
      width: 8rem;
      height: 2.3rem;
      color: white;
      background: ${COMMON_CSS["button-color"]};
      border: 0px;
      border-radius: 6px;
      &:hover {
        background: ${COMMON_CSS["button-hover-color"]};
      }
    }
  }
`;

function AnswerInput({}) {
  return (
    <AnswerInputContainer>
      <form>
        <label htmlFor="answer">Your Answer</label>
        <textarea placeholder="What do you think?" id="answer" />
        <button onClick={() => {}}>Post Your Answer</button>
      </form>
    </AnswerInputContainer>
  );
}

export default AnswerInput;
