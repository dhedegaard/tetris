import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    score: 0,
  },
  reducers: {
    increaseScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload
    },
    resetScore: (state) => {
      state.score = 0
    },
  },
})

export const scoreActions = scoreSlice.actions

export const scoreReducer = scoreSlice.reducer
