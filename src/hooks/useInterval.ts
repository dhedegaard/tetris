import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number) => {
  const delayRef = useRef(delay);
  delayRef.current = delay;

  const lastTickRef = useRef(Date.now());

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const callback = () => {
      const now = Date.now();
      const delta = now - lastTickRef.current;
      if (delta >= delayRef.current) {
        console.log({ delta });
        callbackRef.current();
        lastTickRef.current = now;
      }
      window.requestAnimationFrame(callback);
    };
    window.requestAnimationFrame(callback);
  }, []);
};

export default useInterval;
