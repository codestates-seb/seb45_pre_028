import axios from "axios";
import { atom, selector } from "recoil";
import { Question } from "../types/types";

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
