import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "react-use";

const useInterval = (callback: () => void, delay: number) => {
  const delayRef = useRef(delay);
  delayRef.current = delay;

  const lastTickRef = useRef(Date.now());

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useIsomorphicLayoutEffect(() => {
    const callback = () => {
      const { current: currentLastTick } = lastTickRef;
      const { current: currentDelay } = delayRef;
      const delta = Date.now() - currentLastTick;
      if (delta >= currentDelay) {
        callbackRef.current();
        lastTickRef.current += currentDelay;
      }
      window.requestAnimationFrame(callback);
    };
    window.requestAnimationFrame(callback);
  }, []);
};

export default useInterval;
