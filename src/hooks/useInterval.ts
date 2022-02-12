import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "react-use";

const useInterval = (callback: () => void, delay: number) => {
  const delayRef = useRef(delay);
  delayRef.current = delay;

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const lastTickRef = useRef(0);
  useIsomorphicLayoutEffect(() => {
    const callback: FrameRequestCallback = (time) => {
      const { current: currentLastTick } = lastTickRef;
      const { current: currentDelay } = delayRef;
      const delta = time - currentLastTick;
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
