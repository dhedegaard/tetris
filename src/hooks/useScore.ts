import { useState } from 'react'

/** Handles keeping track of the current score in the game. */
export default () => {
  const [score, setScore] = useState(0)

  const increaseScore = (amount: number) =>
    setScore(oldScore => oldScore + amount)

  const resetScore = () => setScore(0)

  return {
    score,
    increaseScore,
    resetScore
  }
}
