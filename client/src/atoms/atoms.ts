import { atom } from "recoil";
import { Question } from "../types/types";

export const questionsState = atom<Question[]>({
  key: "questionsState",
  default: [],
});

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});
