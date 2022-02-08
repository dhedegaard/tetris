import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined
  );

  useEffect(() => {
    if (timerRef.current != null) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
    timerRef.current = setInterval(() => callbackRef.current(), delay);
    return () => {
      if (timerRef.current != null) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, [delay]);
};

export default useInterval;
