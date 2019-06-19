import { useRef } from 'react'
import { Coordinate, Coordinates } from '../components/ShapeDrawer'
import { Direction, Shapes } from '../components/shapes'
import useBlocks from './useBlocks'
import useDirection from './useDirection'
import useGamestate, { Gamestate } from './useGamestate'
import useKeyboard, { Player } from './useKeyboard'
import useLevel, { calculateTickRate } from './useLevel'
import usePosition from './usePosition'
import useScore, { calculateScore } from './useScore'
import useShape from './useShape'
import useTick from './useTick'
import { useSwipeable } from 'react-swipeable'

export type StateRef = React.MutableRefObject<{
  position: Coordinate
  direction: Direction
  shape: Shapes
  gamestate: Gamestate
  score: number
  increaseScore: (amount: number) => void
  isFreePositions: (newPositions: Coordinates) => boolean
}>

interface Input {
  player: Player
}
/** A hook that contains all the logic regarding tetris. */
const useTetris = ({ player }: Input) => {
  const { gamestate, setGameover, setAlive } = useGamestate()
  const {
    position,
    moveLeft,
    moveRight,
    moveDown,
    resetPosition
  } = usePosition()
  const { shape, nextShape, peekShapes } = useShape()
  const { direction, resetDirection, setNextDirection } = useDirection()
  const { score, increaseScore, resetScore } = useScore()
  const {
    blocks,
    addBlocks,
    clearFilledRows,
    isFreePositions,
    clearAllBlocks
  } = useBlocks(setGameover)
  const { level, incrementRowsCleared, resetLevel } = useLevel()

  // Build a ref os state, for various cases.
  const stateRef: StateRef = useRef({
    position,
    direction,
    shape,
    gamestate,
    score,
    isFreePositions: () => {
      throw new Error('initial state ref')
    },
    increaseScore
  })
  stateRef.current = {
    position,
    direction,
    shape,
    isFreePositions,
    gamestate,
    score,
    increaseScore
  }

  /* Call this when we're ready to persist blocks. */
  const persistBlock = (blocksToPersist: Coordinates) => {
    addBlocks(blocksToPersist)
    const rowsCleared = clearFilledRows()
    if (rowsCleared > 0) {
      increaseScore(calculateScore(level, rowsCleared))
      incrementRowsCleared(rowsCleared)
    }
    nextShape()
    resetPosition()
    resetDirection()
    setTemporaryTick(undefined) // Disable any fast temp ticks.
    setTick(calculateTickRate(level) * 1000)
  }

  // Handle ticks
  const { setTick, setTemporaryTick, resetTick } = useTick(
    stateRef,
    moveDown,
    persistBlock
  )

  /* Start a new game, setup the board again. */
  const newGame = () => {
    clearAllBlocks()
    nextShape()
    resetPosition()
    resetDirection()
    setAlive()
    resetLevel()
    resetScore()
    resetTick()
  }

  /* While the next position is free, move down fast. */
  const setMoveToBottom = (moveToBottom: boolean) => {
    setTemporaryTick(moveToBottom ? 40 : undefined)
  }

  // Handle keyboard events.
  useKeyboard(
    stateRef,
    moveLeft,
    moveRight,
    setNextDirection,
    setMoveToBottom,
    newGame,
    player
  )

  const swipeableHander = useSwipeable({
    onSwipedDown: () => setMoveToBottom(true),
    onSwipedLeft: () => moveLeft(),
    onSwipedRight: () => moveRight(),
    onSwipedUp: () => setNextDirection()
  })

  return {
    blocks,
    direction,
    position,
    shape,
    gamestate,
    score,
    peekShapes,
    level,
    swipeableHander
  }
}

export default useTetris
