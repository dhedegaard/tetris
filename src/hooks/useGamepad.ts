import { useCallback, useEffect, useRef } from 'react'
import { attemptToDoMove, moveGoToBottom, startNewGame } from '../store/actions/game'
import { useTetrisDispatch } from '../store/tetris'
import useGamestate, { Gamestate } from './useGamestate'

const DEFAULT_INTERVAL = 150
const useGamepad = () => {
  const dispatch = useTetrisDispatch()
  const { gamestate } = useGamestate()
  const gamestateRef = useRef<Gamestate>(gamestate)
  gamestateRef.current = gamestate

  const lastClickedRef = useRef<{ [key: string]: number }>({})
  const handleGamepad = useCallback(
    (_gamepad: Gamepad) => {
      const moveNullOrAfterInterval = (move: string) => {
        const lastClicked = lastClickedRef.current[move]
        return lastClicked == null || Date.now() - lastClicked >= DEFAULT_INTERVAL
      }

      const handler: FrameRequestCallback = () => {
        const gamepad = navigator.getGamepads()[_gamepad.index]
        if (gamepad == null || !gamepad.connected) {
          return
        }

        const now = Date.now()
        const { buttons, axes } = gamepad
        if (gamestateRef.current === 'alive') {
          if (buttons[12]?.pressed || buttons[0]?.pressed || (axes[1] != null && axes[1] < -0.9)) {
            // Up or A
            if (moveNullOrAfterInterval('ROTATE')) {
              dispatch(attemptToDoMove('ROTATE'))
              lastClickedRef.current['ROTATE'] = now
            }
          }
          if (buttons[13]?.pressed || (axes[1] != null && axes[1] > 0.9)) {
            // Down
            if (moveNullOrAfterInterval('DOWN')) {
              dispatch(attemptToDoMove('DOWN'))
              lastClickedRef.current['DOWN'] = now - 125
            }
          }
          if (buttons[14]?.pressed || (axes[0] != null && axes[0] < -0.9)) {
            // Left
            if (moveNullOrAfterInterval('LEFT')) {
              dispatch(attemptToDoMove('LEFT'))
              lastClickedRef.current['LEFT'] = now
            }
          }
          if (buttons[15]?.pressed || (axes[0] != null && axes[0] > 0.9)) {
            // Right
            if (moveNullOrAfterInterval('RIGHT')) {
              dispatch(attemptToDoMove('RIGHT'))
              lastClickedRef.current['RIGHT'] = now
            }
          }
          if (buttons[1]?.pressed) {
            // B
            if (moveNullOrAfterInterval('moveToBottom')) {
              dispatch(moveGoToBottom())
              lastClickedRef.current['moveToBottom'] = now + 850
            }
          }
        }
        if (gamestateRef.current === 'gameover' && buttons[0]?.pressed === true) {
          // A
          dispatch(startNewGame())
        }

        // Repeat if we're not supposed to cancel.
        requestAnimationFrame(handler)
      }
      requestAnimationFrame(handler)
    },
    [dispatch]
  )

  useEffect(() => {
    const handler = ({ gamepad }: GamepadEvent) => {
      handleGamepad(gamepad)
    }
    window.addEventListener('gamepadconnected', handler, { passive: true })
    return () => {
      window.removeEventListener('gamepadconnected', handler)
    }
  }, [handleGamepad])
}

export default useGamepad
