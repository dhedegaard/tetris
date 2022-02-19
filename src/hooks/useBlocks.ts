import { useCallback, useMemo } from "react";
import { Coordinates } from "../components/ShapeDrawer";
import { Coordinate } from "../store/slices/blocks";
import { TetrisStoreState, useTetrisSelector } from "../store/tetris";

const blocksSelect = (state: TetrisStoreState) => state.blocks.blocks;

const useBlocks = () => {
  const blocks = useTetrisSelector(blocksSelect);

  /** Checks to see if the given coordinate is free of blocks, and inside the grid. */
  const isBlockFree = useCallback(
    (coordinate: Coordinate): boolean =>
      coordinate.y < 20 &&
      coordinate.x >= 0 &&
      coordinate.x < 10 &&
      blocks.find((b) => b.x === coordinate.x && b.y === coordinate.y) == null,
    [blocks]
  );

  /** Check that all the given positions are free in the grid. */
  const isFreePositions = useCallback(
    (newPositions: Coordinates): boolean =>
      newPositions.find((e) => !isBlockFree(e)) == null,
    [isBlockFree]
  );

  return useMemo(
    () => ({
      blocks,
      isBlockFree,
      isFreePositions,
    }),
    [blocks, isBlockFree, isFreePositions]
  );
};

export default useBlocks;
