import { useCallback, useMemo, useState } from "react";

/** Calculate the amount of score points earned, based on the number of lines cleared and the level. */
export const calculateScore = (level: number, linesCleared: number): number => {
  switch (linesCleared) {
    case 1:
      return 40 * (level + 1);
    case 2:
      return 100 * (level + 1);
    case 3:
      return 300 * (level + 1);
    case 4:
      return 1200 * (level + 1);
  }
  throw new Error(
    "Unhandled case, level:" + level + ", linesCleared:" + linesCleared
  );
};

/** Handles keeping track of the current score in the game. */
const useScore = () => {
  const [score, setScore] = useState(0);

  const increaseScore = useCallback(
    (amount: number) => setScore((oldScore) => oldScore + amount),
    []
  );

  const resetScore = useCallback(() => setScore(0), []);

  return useMemo(
    () => ({
      score,
      increaseScore,
      resetScore,
    }),
    [increaseScore, resetScore, score]
  );
};

export default useScore;
