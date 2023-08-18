import { atom } from "recoil";
import { Question } from "../types/types";

export const questionsState = atom<Question>({
  key: "questionsState",
  default: {
    questionData: [],
    pageInfo: { page: 1, size: 10, totalElements: 0, totalPages: 0 },
  },
});

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});

export const loggedIn = atom({
  key: "loggedIn",
  default: false,
});
