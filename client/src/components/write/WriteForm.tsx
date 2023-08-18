// import "@stackoverflow/stacks";
// import { StacksEditor } from "@stackoverflow/stacks-editor";
// import "@stackoverflow/stacks-editor/dist/styles.css";
// import "@stackoverflow/stacks/dist/css/stacks.css";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalState, questionsState } from "../../atoms/atoms";
import { COMMON_CSS } from "../../constants/common_css";
import { useFetch } from "../../hooks/useFetch";
import { QuestionData } from "../../types/types";
import Modal from "../common/Modal";

const StyledField = styled.div`
  label {
    font-size: 0.9375rem;
    font-weight: 600;
  }

  p {
    font-size: 0.75rem;
    margin: 0 0 0.9375rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem 0.5625rem;
    border-radius: 6px;
    border: 1px solid #babfc4;

    &:focus {
      outline: none;
      border: 1px solid #6ebcf7;
      box-shadow: 0 0 0 4px #dff1ff;
    }
  }

  textarea {
    min-height: 18.75rem;
  }

  .button {
    background: ${COMMON_CSS["button-color"]};
    padding: 0.8125rem;
    margin: 0.625rem 0 0;
    border-radius: 6px;
    border: none;
    color: #fff;

    &:hover,
    &:focus {
      outline: none;
      background: ${COMMON_CSS["button-hover-color"]};
    }
  }

  #editor-container {
    button {
      padding: 0.1875rem;
    }

    ul,
    ol {
      margin-left: 1.25rem;
    }

    p {
      font-size: 1rem;
    }
  }

  &.disabled {
    cursor: not-allowed;
    border: 1px solid #a5a5a5;
    opacity: 0.3;

    button {
      display: none;
    }

    textarea {
      pointer-events: none;
    }
  }
`;

const StyledDiscardButton = styled.button`
  color: #ab262a;
  background: transparent;
  border: none;
  padding: 0.8rem;
  border-radius: 6px;

  &:hover,
  &:focus {
    outline: none;
    background: #fdf2f2;
  }
`;

const WriteForm = (): JSX.Element => {
  const { fetchData } = useFetch(questionsState, "/question");
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const setModal = useSetRecoilState(modalState);
  const modalIsOpen = useRecoilValue(modalState);
  const { register, handleSubmit, reset } = useForm<QuestionData>();

  const onClickHandler = () => {
    setIsActive(true);
  };

  //isActive가 아닐때 tab키로 cursor이동 방지
  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Tab") {
      console.log(event);
      event.preventDefault();
    }
  };

  const onSubmit = async (data: QuestionData) => {
    // const editorData = document.querySelector(".js-editor") as HTMLElement;
    // const formData = { ...data, content: editorData.innerHTML };
    // console.log(formData);

    data = {
      ...data,
      // member_id: 1,
    };

    try {
      const response = await axios.post("/question", data);
      if (response) {
        navigate("/");
        fetchData();
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      navigate("/error", {
        state: { status: axiosError.status, errorMessage: axiosError.message },
      });
    }
  };

  const toggleModal = () => {
    setModal(!modalIsOpen);
  };

  const resetValue = () => {
    reset({ title: "", content: "" });
    setModal(!modalIsOpen);
    setIsActive(false);
  };

  // const [editorInitialized, setEditorInitialized] = useState(false);

  // useEffect(() => {
  //   if (!editorInitialized) {
  //     setEditorInitialized(true);
  //   } else {
  //     const editorContainer = document.querySelector("#editor-container") as HTMLElement;
  //     if (editorContainer) {
  //       new StacksEditor(editorContainer, "", {
  //         parserFeatures: {
  //           tables: false,
  //         },
  //       });
  //     }
  //   }
  // }, [editorInitialized]);

  return (
    <>
      <StyledField className="box">
        <label htmlFor="title">Title</label>
        <p>Be specific and imagine you’re asking a question to another person.</p>
        <input id="title" {...register("title")} />
        <button
          className="button"
          onClick={onClickHandler}
          onKeyDown={isActive ? undefined : onKeyDownHandler}
        >
          Next
        </button>
      </StyledField>

      <StyledField className={`box ${isActive ? "" : "disabled"}`}>
        <label htmlFor="content">What are the details of your problem?</label>
        <p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
        <textarea id="content" {...register("content")}></textarea>
        {/* <div id="editor-container"></div> */}
        <button className="button" onClick={handleSubmit(onSubmit)}>
          Post your question
        </button>
      </StyledField>

      {modalIsOpen && (
        <Modal>
          <>
            <h1>Discard question</h1>
            <p>Are you sure you want to discard this question? This cannot be undone.</p>
            <div className="button-gap">
              <button className="discard-action" onClick={resetValue}>
                Discard question
              </button>
              <button className="cancel-action" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </>
        </Modal>
      )}

      {isActive && (
        <StyledDiscardButton onClick={toggleModal} className="discard-button">
          Discard draft
        </StyledDiscardButton>
      )}
    </>
  );
};

export default WriteForm;
