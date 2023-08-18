import styled from "styled-components";
import { COMMON_CSS } from "../../constants/common_css";

interface paginationProp {
  onPrevPage: () => void;
  onNextPage: () => void;
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => void;
}

const StyledPagination = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-flow: row;
  gap: 0.25rem;

  button {
    background: #fff;
    border: 1px solid ${COMMON_CSS["border-color"]};
    padding: 0 0.5rem;
    line-height: 1.5rem;
    border-radius: 4px;

    &:hover,
    &.active {
      background: ${COMMON_CSS["main-color"]};
      border: 1px solid ${COMMON_CSS["main-color"]};
      color: #fff;
    }

    &.disabled {
      display: none;
    }
  }
`;

const Pagination = ({
  onPrevPage,
  onNextPage,
  currentPage,
  totalPages,
  onPageChange,
}: paginationProp) => {
  const firstVisiblePage = Math.max(currentPage - 2, 1);
  const lastVisiblePage = Math.min(firstVisiblePage + 4, totalPages);

  const visiblePageNumbers = Array.from(
    { length: lastVisiblePage - firstVisiblePage + 1 },
    (_, index) => firstVisiblePage + index,
  );

  return (
    <StyledPagination>
      <button onClick={onPrevPage} className={currentPage === 1 ? "disabled" : ""}>
        prev
      </button>
      {visiblePageNumbers.map((pageNumber) => (
        <button
          className={currentPage === pageNumber ? "active" : ""}
          key={pageNumber}
          onClick={(event) => onPageChange(event, pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button onClick={onNextPage} className={currentPage === totalPages ? "disabled" : ""}>
        next
      </button>
    </StyledPagination>
  );
};

export default Pagination;
