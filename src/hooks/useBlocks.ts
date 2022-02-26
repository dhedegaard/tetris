import { useMemo } from "react";
import { TetrisStoreState, useTetrisSelector } from "../store/tetris";

const blocksSelect = (state: TetrisStoreState) => state.blocks.blocks;

const useBlocks = () => {
  const blocks = useTetrisSelector(blocksSelect);

  return useMemo(() => ({ blocks }), [blocks]);
};

export default useBlocks;
