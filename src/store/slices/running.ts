import { createSlice } from '@reduxjs/toolkit'

const runningSlice = createSlice({
  name: 'running',
  initialState: {
    running: false,
  },
  reducers: {
    setRunning: (state) => {
      state.running = true
    },
    setStopped: (state) => {
      state.running = false
    },
  },
})

export const runningReducer = runningSlice.reducer

export const runningActions = runningSlice.actions
