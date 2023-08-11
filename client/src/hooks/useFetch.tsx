import { useEffect, useState } from "react";
import { RecoilState, RecoilValue, useRecoilState, useRecoilValueLoadable } from "recoil";

export interface FetchReturn<T> {
  isLoading: boolean;
  isError: boolean;
  data: T;
}

export const useFetch = <T extends object>(
  atom: RecoilState<T>,
  selector: RecoilValue<T>,
): FetchReturn<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useRecoilState(atom);
  const readDataLoadable = useRecoilValueLoadable(selector);

  const fetchData = () => {
    switch (readDataLoadable.state) {
      case "loading":
        setIsLoading(true);
        break;
      case "hasValue":
        setIsLoading(false);
        setData(readDataLoadable.contents);
        break;
      case "hasError":
        setIsError(true);
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    isLoading,
    isError,
    data,
  };
};
