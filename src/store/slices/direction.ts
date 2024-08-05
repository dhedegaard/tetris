import { createSlice } from '@reduxjs/toolkit'
import { Direction, nextDirection } from '../../components/shapes'

const DEFAULT_DIRECTION = 'RIGHT'

const directionSlice = createSlice({
  name: 'direction',
  initialState: {
    direction: DEFAULT_DIRECTION as Direction,
  },
  reducers: {
    resetDirection: (state) => {
      state.direction = DEFAULT_DIRECTION
    },
    rotateDirection: (state) => {
      state.direction = nextDirection(state.direction)
    },
  },
})

export const directionActions = directionSlice.actions

export const directionReducer = directionSlice.reducer
