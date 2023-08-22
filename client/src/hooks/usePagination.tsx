import { useState } from "react";
import { RecoilState } from "recoil";
import { useFetch } from "./useFetch";

export interface PaginationReturn {
  currentPage: number;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  onPageChangeHandler: (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => void;
  onPrevPageHandler: () => void;
  onNextPageHandler: () => void;
}

export const usePagination = <T extends object>(
  atom: RecoilState<T>,
  pageSize: number,
  data: string,
): PaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { fetchData } = useFetch(atom, `/${data}?page=${currentPage}&size=${pageSize}`);

  const onPageChangeHandler = (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => {
    if (pageNumber === currentPage) {
      event.preventDefault();
      return;
    }
    setCurrentPage(pageNumber);
    fetchData();
  };

  const onPrevPageHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    fetchData();
  };

  const onNextPageHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    fetchData();
  };

  return {
    currentPage,
    totalPages,
    setTotalPages,
    onPageChangeHandler,
    onPrevPageHandler,
    onNextPageHandler,
  };
};
