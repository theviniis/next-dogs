import { useCallback, useRef } from "react";

const useDebounce = (delay = 500) => {
  const timer = useRef<NodeJS.Timeout>();

  const debounce = useCallback(
    (callback: () => void) => {
      clearTimeout(timer.current);
      const newTimer = setTimeout(() => {
        callback();
      }, delay);

      timer.current = newTimer;
    },
    [delay],
  );

  return debounce;
};

export default useDebounce;
