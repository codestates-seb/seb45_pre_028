import { atom } from "recoil";
import { Answer, Member, Question } from "../types/types";

export const questionsState = atom<Question>({
  key: "questionsState",
  default: {
    questionData: [],
    pageInfo: { page: 1, size: 10, totalElements: 0, totalPages: 1 },
  },
});

export const answerState = atom<Answer>({
  key: "answerState",
  default: {
    answerData: [],
    pageInfo: { page: 1, size: 10, totalElements: 0, totalPages: 1 },
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

export const memberState = atom<Member>({
  key: "memberState",
  default: {},
});
