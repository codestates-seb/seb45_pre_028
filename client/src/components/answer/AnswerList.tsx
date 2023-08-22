import { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { answerState, modalState } from "../../atoms/atoms";
import { useFetch } from "../../hooks/useFetch";
import Modal from "../common/Modal";
import { Answer, AnswerData } from "../../types/types";
import { useParams } from "react-router-dom";
import { getFormattedDate } from "../../util/date";
import { getAccessToken } from "../../util/auth";

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  max-width: 79rem;

  h2 {
    font-weight: 500;
    margin-bottom: 0.5rem;
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

  .content {
    padding: 1rem 0;
    max-width: 79rem;
    margin: 0 1rem;
  }

  .answer_user {
    width: 12.5rem;
    .time {
      margin: 0.0625rem 0 0.25rem 0;
      font-weight: 300;
      font-size: 0.75rem;
    }

    .answer_id {
      font-weight: 400;
      font-size: 0.8125rem;
    }
  }
  .answer_box {
    padding: 1rem 0;
    border-bottom: 1px solid rgb(227, 230, 232);
    max-width: 79rem;
  }
  textarea {
    max-width: 79rem;
    width: 100%;
    resize: none;
    height: 5rem;
    font-size: 1rem;
  }
`;

function AnswerList() {
  const modalIsOpen = useRecoilValue<boolean>(modalState);
  const setModal = useSetRecoilState<boolean>(modalState);
  const { id } = useParams();
  const [newContent, setNewContent] = useState<string>("");
  const [deletePendingId, setDeletePendingId] = useState<number | null>(null);
  const { fetchData, isLoading, isError, data } = useFetch<Answer>(
    answerState,
    `/question/${id}/answer?page=1&size=10`,
  );
  const [changeContent, setChangeContent] = useState<boolean[]>(
    new Array(data.answerData?.length + 1).fill(false),
  );
  const toggleModal = (id: number | null = null) => {
    setDeletePendingId(id);
    setModal(!modalIsOpen);
  };
  type Headers = Record<string, string>;
  const headers: Headers = {
    "ngrok-skip-browser-warning": "69420",
  };
  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const deleteHandler = async (answerId: number) => {
    try {
      setDeletePendingId(answerId);
      setNewContent("");
      await axios.delete(`/question/answer/${answerId}`, { headers });
      await fetchData();
    } catch (error) {
      alert("권한이 없습니다.");
    } finally {
      setDeletePendingId(null);
      toggleModal();
    }
  };

  const patchHandler = async (answerId: number) => {
    try {
      await setChangeContent(new Array(data.answerData?.length + 1).fill(false));

      await axios.patch(
        `/question/answer/${answerId}`,
        {
          content: `${newContent}`,
        },
        { headers },
      );
      await fetchData();
    } catch (error) {
      alert("권한이 없습니다.");
    } finally {
      setChangeContent(new Array(data.answerData?.length + 1).fill(false));
    }
  };
  const printState = (createdAt: string, modifiedAt: string): string => {
    return createdAt === modifiedAt ? "answered" : "modified";
  };
  const printDate = (createdAt: string, modifiedAt: string): string => {
    const date = new Date(createdAt === modifiedAt ? createdAt : modifiedAt).toString();
    return getFormattedDate(date);
  };
  const ChangeContentHandler = (id: number) => {
    const newArray = changeContent.slice();
    newArray[id] = true;
    setChangeContent(newArray);
  };

  if (isLoading) {
    return <AnswerContainer>Loading...</AnswerContainer>;
  }

  if (isError) {
    return <AnswerContainer>Error...!</AnswerContainer>;
  }

  return (
    <AnswerContainer>
      <div>
        {<h2>{data.answerData?.length} Answer</h2>}
        {data.answerData?.map((item: AnswerData) => (
          <div key={item.answerId} className="answer_box">
            {changeContent[item.answerId] ? (
              <textarea
                placeholder={item.content}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              ></textarea>
            ) : (
              <div className="content">{item.content}</div>
            )}
            <div className="info">
              {changeContent[item.answerId] ? (
                <div className="option">
                  <button
                    onClick={() => {
                      patchHandler(item.answerId);
                    }}
                  >
                    Change
                  </button>
                  <button
                    onClick={() => {
                      setNewContent("");
                      const newArray = changeContent.slice();
                      newArray[item.answerId] = false;
                      setChangeContent(newArray);
                      return setChangeContent(newArray);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                !!token && (
                  <div className="option">
                    <button
                      onClick={() => {
                        ChangeContentHandler(item.answerId);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => toggleModal(item.answerId)}>Delete</button>
                  </div>
                )
              )}
              <div className="answer_user">
                <div className="time">
                  {printState(item.createdAt, item.modifiedAt)}{" "}
                  {printDate(item.createdAt, item.modifiedAt)}
                </div>
                {/* <div className="answer_id">{item.member_id}</div> */}
              </div>
            </div>
          </div>
        ))}
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
                  if (deletePendingId !== null) {
                    deleteHandler(deletePendingId);
                  }
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
    </AnswerContainer>
  );
}

export default AnswerList;
