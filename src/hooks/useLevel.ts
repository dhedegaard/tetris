import { useMemo } from 'react'
import { selectLevel } from '../store/slices/level'
import { useTetrisStore } from '../store/tetris'

/** The level of the game */
export const useLevel = () => {
  const level = useTetrisStore(selectLevel)

  return useMemo(() => ({ level }), [level])
}
