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
      // Pause the ticks while we're hidden.
      if (document.hidden) {
        lastTickRef.current = time;
        window.requestAnimationFrame(callback);
        return;
      }

      // Determine how much time has passed since the last tick.
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
