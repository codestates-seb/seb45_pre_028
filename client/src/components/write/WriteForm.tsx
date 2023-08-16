// import "@stackoverflow/stacks";
// import { StacksEditor } from "@stackoverflow/stacks-editor";
// import "@stackoverflow/stacks-editor/dist/styles.css";
// import "@stackoverflow/stacks/dist/css/stacks.css";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { questionsState } from "../../atoms/atoms";
import { COMMON_CSS } from "../../constants/common_css";
import { useFetch } from "../../hooks/useFetch";
import { Question } from "../../types/types";

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
    resize: none;
    min-height: 18.75rem;
  }

  .button {
    background: ${COMMON_CSS["button-color"]};
    padding: 0.8125rem;
    margin: 0.625rem 0 0;
    border-radius: 6px;
    border: none;
    color: #fff;
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

const WriteForm = (): JSX.Element => {
  const { fetchData } = useFetch(questionsState, "http://localhost:3001/question");
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const { register, handleSubmit } = useForm<Question>();

  const onClickHandler = () => {
    setIsActive(true);
  };

  const onSubmit = async (data: Question) => {
    // const editorData = document.querySelector(".js-editor") as HTMLElement;
    // const formData = { ...data, content: editorData.innerHTML };
    // console.log(formData);

    data = {
      ...data,
      createdAt: new Date().toISOString(),
      member_id: 1,
    };

    try {
      const response = await axios.post("http://localhost:3001/question", data);
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
        <button className="button" onClick={onClickHandler}>
          Next
        </button>
      </StyledField>

      <StyledField className={`box ${isActive ? "" : "disabled"}`}>
        <label htmlFor="content">What are the details of your problem?</label>
        <p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
        <textarea id="content" {...register("content")}></textarea>
        {/* <div id="editor-container"></div> */}
        <button className="button" onClick={handleSubmit(onSubmit)}>
          Submit
        </button>
      </StyledField>
    </>
  );
};

export default WriteForm;
