import { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AnswerState, modalState } from "../../atoms/atoms";
import { useFetch } from "../../hooks/useFetch";
import Modal from "../common/Modal";
import { Answer } from "../../types/types";

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
    margin: 0.625rem 0.375rem auto auto;

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
`;

function AnswerList() {
  const modalIsOpen = useRecoilValue(modalState);
  const setModal = useSetRecoilState(modalState);
  const [deletePendingId, setDeletePendingId] = useState<number | null>(null);
  const { fetchData, isLoading, isError, data } = useFetch<Answer[]>(
    AnswerState,
    "http://localhost:3001/answer",
  );

  const toggleModal = (id: number | null = null) => {
    setDeletePendingId(id);
    setModal(!modalIsOpen);
  };

  const deleteHandler = async (id: number) => {
    try {
      setDeletePendingId(id);
      await axios.delete(`http://localhost:3001/answer/${id}`);
      await fetchData();
    } catch (error) {
      // 에러 처리
    } finally {
      setDeletePendingId(null);
      toggleModal();
    }
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
        {data && <h2>{data.length} Answer</h2>}
        {data &&
          data.map((x: Answer) => (
            <div key={x.answer_id} className="answer_box">
              <div className="content">{x.content}</div>
              <div className="info">
                <div className="option">
                  <button onClick={() => {}}>Edit</button>
                  <button onClick={() => toggleModal(x.answer_id)}>Delete</button>
                </div>
                <div className="answer_user">
                  <div className="time">
                    answered {x.createdAt.slice(2, 10)} {x.createdAt.slice(11, 16)}
                  </div>
                  <div className="answer_id">{x.member_id}</div>
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
