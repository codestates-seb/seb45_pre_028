import { styled } from "styled-components";
import { QuestionData } from "../../types/types";
import { questionState } from "../../atoms/atoms";
import { useFetch } from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { COMMON_CSS } from "../../constants/common_css";
import { getFormattedDate } from "../../util/date";
import { useState } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import { getAccessToken } from "../../util/auth";
const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  max-width: 79rem;
  .title {
    font-size: 1.6875rem;
  }
  h2 {
    font-weight: 400;
    margin-bottom: 0.5rem;
  }
  .content {
    padding: 1rem 0;
    max-width: 79rem;
    margin: 0 1rem;
  }
  .question_user {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .time {
    width: 12.5rem;
    margin: 0.0625rem 0 0.25rem 0;
    font-weight: 300;
    font-size: 0.75rem;
  }
  .question_id {
    font-weight: 400;
    font-size: 0.8125rem;
  }
  .question_box {
    padding: 1rem 0;
    border-bottom: 1px solid rgb(227, 230, 232);
    max-width: 79rem;
  }
  .title_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgb(227, 230, 232);
    .title-input {
      height: 2.3rem;
      width: 30%;
      font-size: 1.6875rem;
    }
  }
  .ask-button {
    font-size: 0.8125rem;
    background: ${COMMON_CSS["button-color"]};
    color: #fff;
    padding: 0.8rem;
    border-radius: 6px;
    &:hover {
      background: ${COMMON_CSS["button-hover-color"]};
    }
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .option {
    display: flex;
    gap: 1rem;
    align-items: center;

    button {
      border: 0;
      background-color: transparent;
      cursor: pointer;
      font-size: 0.875rem;
      color: #555;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      transition:
        background-color 0.3s,
        color 0.3s;

      &:hover {
        background-color: #f2f2f2;
        color: #222;
      }
    }
  }
  textarea {
    max-width: 79rem;
    width: 100%;
    resize: none;
    height: 100%;
    font-size: 1rem;
    margin-top: 1rem;
  }
`;

function Question() {
  // const modalIsOpen = useRecoilValue<boolean>(modalState);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { id } = useParams<string>();
  // const setModal = useSetRecoilState<boolean>(modalState);
  const [newContent, setNewContent] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [changeContent, setChangeContent] = useState<boolean>(false);
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  const printState = (createdAt: string, modifiedAt: string): string => {
    return createdAt === modifiedAt ? "asked" : "modified";
  };
  const printDate = (createdAt: string, modifiedAt: string): string => {
    const date = new Date(createdAt === modifiedAt ? createdAt : modifiedAt).toString();
    return getFormattedDate(date);
  };
  const { fetchData, isLoading, isError, data } = useFetch<QuestionData>(
    questionState,
    `/question/${id}`,
  );

  const ChangeContentHandler = () => {
    setChangeContent(!changeContent);
  };
  const deleteHandler = async (questionId: string | undefined) => {
    console.log(questionId);
    try {
      type Headers = Record<string, string>;
      const headers: Headers = {
        "ngrok-skip-browser-warning": "69420",
      };
      const token = getAccessToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      await axios.delete(`/question/${questionId}`, { headers });
      await fetchData();
      setNewContent("");
    } catch (error) {
      // 에러 처리
    } finally {
      toggleModal();
    }
  };
  const patchHandler = async (questionId: number) => {
    try {
      await setChangeContent(!changeContent);

      await axios.patch(
        `/question/${questionId}`,
        {
          title: `${newTitle}`,
          content: `${newContent}`,
        },
        { headers: { "ngrok-skip-browser-warning": "69420" } },
      );
      await fetchData();
    } catch (error) {
      // 에러 처리
    } finally {
      setChangeContent(!changeContent);
    }
  };
  if (isLoading) {
    return (
      <QuestionContainer>
        <div>Loading...</div>
      </QuestionContainer>
    );
  }

  if (isError) {
    return (
      <QuestionContainer>
        <div>Error...!</div>
      </QuestionContainer>
    );
  }
  if (data) {
    return (
      <QuestionContainer>
        <div key={data?.id} className="question_box">
          <div className="title_box">
            {changeContent ? (
              <textarea
                className="title-input"
                placeholder={data?.title}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              ></textarea>
            ) : (
              <div className="title">{data?.title}</div>
            )}

            <Link to="/write" className="ask-button">
              Ask Question
            </Link>
          </div>
          {changeContent ? (
            <textarea
              placeholder={data?.content}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            ></textarea>
          ) : (
            <div className="content">{data?.content}</div>
          )}
          <div className="question_user">
            {changeContent ? (
              <div className="option">
                <button
                  onClick={() => {
                    patchHandler(data.questionId);
                  }}
                >
                  Change
                </button>
                <button
                  onClick={() => {
                    setNewContent("");
                    return setChangeContent(!changeContent);
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="option">
                <button
                  onClick={() => {
                    ChangeContentHandler();
                  }}
                >
                  Edit
                </button>
                <button onClick={() => toggleModal()}>Delete</button>
              </div>
            )}
            <div className="time">
              {printState(data?.createdAt, data?.modifiedAt)}{" "}
              {printDate(data?.createdAt, data?.modifiedAt)}
            </div>
            {/* <div className="question_id">{data?.member_id}</div> */}
          </div>
        </div>
        {modalIsOpen && (
          <Modal>
            <>
              <h1>Confirm Delete</h1>
              <p>Are you sure you want to discard this answer? This cannot be undone.</p>
              <div className="button-gap">
                <button
                  className="discard-action"
                  onClick={() => {
                    deleteHandler(id);
                  }}
                >
                  Discard answer
                </button>
                <button className="cancel-action" onClick={() => toggleModal()}>
                  Cancel
                </button>
              </div>
            </>
          </Modal>
        )}
      </QuestionContainer>
    );
  } else {
    return (
      <QuestionContainer>
        <div>No questions available.</div>
      </QuestionContainer>
    );
  }
}

export default Question;
