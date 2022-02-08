import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const id = setInterval(() => callbackRef.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
