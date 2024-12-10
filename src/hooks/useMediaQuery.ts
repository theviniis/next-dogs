"use client";

import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);
  const debounce = useDebounce(500);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => {
      debounce(() => setMatches(event.matches));
    };
    mediaQueryList.addEventListener("change", handleChange);
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query, debounce]);

  return matches;
};

export default useMediaQuery;
