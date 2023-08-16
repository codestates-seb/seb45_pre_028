import React, { useState } from "react";
import { styled } from "styled-components";
import { COMMON_CSS } from "../../constants/common_css";
import axios from "axios";
import { AnswerState } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";
const AnswerInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  form {
    max-width: 79rem;
    padding-bottom: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    font-size: 1.2rem;
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
function AnswerInput() {
  const [answerText, setAnswerText] = useState("");
  const AnswerList = useRecoilValue(AnswerState);

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newAnswer = {
        id: AnswerList.length + 1,
        answer_id: AnswerList.length + 1,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        member_id: 2,
        content: answerText,
      };
      await axios.post("http://localhost:3001/answer", newAnswer);
      setAnswerText("");
      window.location.reload();
    } catch (error) {}
  };

  return (
    <AnswerInputContainer>
      <form onSubmit={handleAnswerSubmit}>
        <label htmlFor="answer">Your Answer</label>
        <textarea
          placeholder="What do you think?"
          required={true}
          id="answer"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
        />
        <button type="submit">Post Your Answer</button>
      </form>
    </AnswerInputContainer>
  );
}

export default AnswerInput;
