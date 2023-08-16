import { atom } from "recoil";
import { Question } from "../types/types";

export const questionsState = atom<Question[]>({
  key: "questionsState",
  default: [],
});
