import { atom } from "recoil";
import { Answer, Question } from "../types/types";

export const questionsState = atom<Question>({
  key: "questionsState",
  default: {
    questionData: [],
    pageInfo: [],
  },
});

export const answerState = atom<Answer>({
  key: "answerState",
  default: {
    answerData: [],
    pageInfo: [],
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
