import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_POSITION = Object.freeze({ x: 4, y: 1 })

interface PositionState {
  position: {
    x: number
    y: number
  }
}

const initialState: PositionState = {
  position: { ...DEFAULT_POSITION },
}

const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    movePosition: (state, action: PayloadAction<{ dx: number; dy: number }>) => {
      state.position.x += action.payload.dx
      state.position.y += action.payload.dy
    },

    resetPosition: (state) => {
      state.position = { ...DEFAULT_POSITION }
    },
  },
})

export const positionActions = positionSlice.actions

export const positionReducer = positionSlice.reducer
