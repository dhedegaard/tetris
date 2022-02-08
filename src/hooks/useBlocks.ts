import { useCallback, useMemo, useState } from "react";
import { Coordinate, Coordinates } from "../components/ShapeDrawer";

const useBlocks = (setGameover: () => void) => {
  const [blocks, setBlocks] = useState<Coordinates>([]);

  /** Checks to see if the given coordinate is free of blocks, and inside the grid. */
  const isBlockFree = useCallback(
    (coordinate: Coordinate): boolean =>
      coordinate.y < 20 &&
      coordinate.x >= 0 &&
      coordinate.x < 10 &&
      blocks.find((b) => b.x === coordinate.x && b.y === coordinate.y) == null,
    [blocks]
  );

  const isRowFilled = useCallback(
    (y: number, blockState: Coordinates): boolean =>
      blockState.filter((b) => b.y === y).length === 10,
    []
  );

  /**
   * Clears filled rows from the blocks, moving all the blocks above down as well.
   * @returns The number of rows cleared.
   */
  const clearFilledRows = useCallback((): number => {
    let numberOfRowsCleared = 0;
    // The number of rows to move the blocks down by.
    setBlocks((oldBlocks) => {
      let result: typeof oldBlocks = [];
      let dy = 0;
      for (let y = 19; y >= 0; y--) {
        if (isRowFilled(y, oldBlocks)) {
          numberOfRowsCleared++;
          dy++;
        } else {
          result = [
            ...result,
            ...oldBlocks
              .filter((b) => b.y === y)
              // eslint-disable-next-line no-loop-func
              .map((b) => ({
                ...b,
                y: y + dy,
              })),
          ];
        }
      }
      return result;
    });
    return numberOfRowsCleared;
  }, [isRowFilled]);

  const addBlocks = useCallback(
    (newBlocks: Coordinates) => {
      setBlocks((oldBlocks) => {
        const result = [...oldBlocks];
        for (const newBlock of newBlocks) {
          if (isBlockFree(newBlock)) {
            result.push(newBlock);
          } else {
            // If we're trying to persist a block, that's not free, the game is over.
            setGameover();
          }
        }
        return result;
      });
    },
    [isBlockFree, setGameover]
  );

  /** Check that all the given positions are free in the grid. */
  const isFreePositions = useCallback(
    (newPositions: Coordinates): boolean =>
      newPositions.find((e) => !isBlockFree(e)) == null,
    [isBlockFree]
  );

  const clearAllBlocks = useCallback(() => setBlocks([]), []);

  return useMemo(
    () => ({
      blocks,
      isBlockFree,
      addBlocks,
      clearFilledRows,
      isFreePositions,
      clearAllBlocks,
    }),
    [
      addBlocks,
      blocks,
      clearAllBlocks,
      clearFilledRows,
      isBlockFree,
      isFreePositions,
    ]
  );
};

export default useBlocks;
