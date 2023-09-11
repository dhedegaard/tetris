import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Coordinate {
  x: number
  y: number
}

export interface Block extends Coordinate {
  color: string
}

const blocksSlice = createSlice({
  name: 'blocks',
  initialState: {
    blocks: [] as Block[],
  },
  reducers: {
    clearAllBlocks: (state) => {
      state.blocks = []
    },
    persistBlock: (state, action: PayloadAction<Block>) => {
      if (state.blocks.some((e) => e.x === action.payload.x && e.y === action.payload.y)) {
        throw new Error(`Block already exists: ${JSON.stringify(action.payload)}`)
      }
      state.blocks.push(action.payload)
    },
    clearBlock: (state, action: PayloadAction<Coordinate>) => {
      state.blocks = state.blocks.filter(
        (e) => e.x === action.payload.x && e.y === action.payload.y
      )
    },
    clearRow: (state, action: PayloadAction<number>) => {
      // Remove the given index.
      state.blocks = state.blocks.filter((e) => e.y !== action.payload)
      // Shift all the rows above one down.
      state.blocks = state.blocks.map((e) => (e.y >= action.payload ? e : { ...e, y: e.y + 1 }))
    },
  },
})

export const blocksActions = blocksSlice.actions

export default blocksSlice.reducer

/**
 * Returns true if the blocks were persisted, otherwise the
 */
