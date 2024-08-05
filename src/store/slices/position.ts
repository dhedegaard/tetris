import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_POSITION = Object.freeze({ x: 4, y: 1 })

const positionSlice = createSlice({
  name: 'position',
  initialState: {
    position: {
      x: DEFAULT_POSITION.x as number,
      y: DEFAULT_POSITION.y as number,
    },
  },
  reducers: {
    movePosition: (state, action: PayloadAction<{ dx: number; dy: number }>) => {
      state.position.x += action.payload.dx
      state.position.y += action.payload.dy
    },

    resetPosition: (state) => {
      state.position = DEFAULT_POSITION
    },
  },
})

export const positionActions = positionSlice.actions

export default positionSlice.reducer
