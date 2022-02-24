import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number) => {
  const delayRef = useRef(delay);
  delayRef.current = delay;

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const lastTickRef = useRef(0);
  useEffect(() => {
    const callback: FrameRequestCallback = (time) => {
      // Determine how much time has passed since the last tick.
      const { current: currentLastTick } = lastTickRef;
      const { current: currentDelay } = delayRef;
      const delta = time - currentLastTick;
      if (delta >= currentDelay) {
        // We're supposed to tick, go to the nearest tick delay and call the callback.
        lastTickRef.current += Math.floor(delta / currentDelay) * currentDelay;
        callbackRef.current();
      }

      // Repeat.
      window.requestAnimationFrame(callback);
    };
    window.requestAnimationFrame(callback);
  }, []);
};

export default useInterval;
