import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { modalState } from "../../atoms/atoms";

interface ModalProp {
  children: JSX.Element;
}

const StyledModal = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(26, 5, 6, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  section {
    position: relative;
    max-width: 37.5rem;
    background: #fff;
    padding: 1.5rem;
    box-shadow:
      0 1px 4px hsla(0, 0%, 0%, 0.09),
      0 3px 8px hsla(0, 0%, 0%, 0.09),
      0 4px 13px hsla(0, 0%, 0%, 0.13);
    border-radius: 8px;

    .close-button {
      position: absolute;
      padding: 1rem;
      top: 0;
      right: 0;
      cursor: pointer;
    }

    h1 {
      font-size: 1.6875rem;
      color: #c22e32;
      margin: 0 0 1rem;
    }

    p {
      font-size: 0.8125rem;
      margin: 0 0 1.5rem;
    }

    button {
      padding: 0.8rem;
      border-radius: 6px;
      border: none;
    }

    .button-gap {
      display: flex;
      flex-flow: row;
      gap: 0.5rem;
    }

    .discard-action {
      background: #c22e32;
      color: #fff;

      &:hover {
        background: #ab262a;
      }
    }

    .cancel-action {
      background: transparent;

      &:hover {
        background: #f9fafa;
      }
    }
  }
`;

const Modal = ({ children }: ModalProp): JSX.Element => {
  const setModal = useSetRecoilState(modalState);
  const modalIsOpen = useRecoilValue(modalState);

  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) setModal(false);
  };

  const toggleModal = () => {
    setModal(!modalIsOpen);
  };

  return (
    <StyledModal onClick={closeModal}>
      <section className="modal">
        <div className="close-button" onClick={toggleModal}>
          <svg
            aria-hidden="true"
            className="svg-icon iconClearSm"
            width="14"
            height="14"
            viewBox="0 0 14 14"
          >
            <path d="M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41Z"></path>
          </svg>
        </div>
        {children}
      </section>
    </StyledModal>
  );
};

export default Modal;
