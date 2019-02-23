import { useState } from 'react'

export type Gamestate = 'alive' | 'gameover'

export default () => {
  const [gamestate, setGamestate] = useState<Gamestate>('alive')

  return {
    gamestate,
    setAlive: () => setGamestate('alive'),
    setGameover: () => setGamestate('gameover')
  }
}
