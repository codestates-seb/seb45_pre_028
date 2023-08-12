import axios from "axios";
import { atom, selector } from "recoil";
import { Answer, Question } from "../types/types";

export const questionsState = atom<Question[]>({
  key: "questionsState",
  default: [],
});

export const readData = selector<Array<Question>>({
  key: "readData",
  get: async () => {
    const response = await axios.get("http://localhost:3001/questions");
    return response.data;
  },
});

export const AnswerState = atom<Answer[]>({
  key: "AnswerState",
  default: [],
});

export const readAnswerData = selector<Array<Answer>>({
  key: "readAnswerData",
  get: async () => {
    const response = await axios.get("http://localhost:3001/answer");
    return response.data;
  },
});
