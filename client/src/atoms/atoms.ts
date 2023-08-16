import { atom } from "recoil";
import { Answer, Question } from "../types/types";

export const questionsState = atom<Question[]>({
  key: "questionsState",
  default: [],
});

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});
export const AnswerState = atom<Answer[]>({
  key: "AnswerState",
  default: [],
});
