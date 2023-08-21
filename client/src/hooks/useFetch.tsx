import axios from "axios";
import { useEffect, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";

export interface FetchReturn<T> {
  fetchData: () => void;
  isLoading: boolean;
  isError: boolean;
  data: T;
}

export const useFetch = <T extends object>(
  atom: RecoilState<T>,
  url: string,
  token: string | null = null,
): FetchReturn<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useRecoilState(atom);

  type Headers = Record<string, string>;
  const headers: Headers = {
    "ngrok-skip-browser-warning": "69420",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(url, { headers });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    fetchData,
    isLoading,
    isError,
    data,
  };
};
